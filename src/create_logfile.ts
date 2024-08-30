const fs = require('fs');
import * as vscode from 'vscode';
// const jsonfile = require('jsonfile');
const path = require('path');
const os = require('os');

export function createLogFile(inputfilepath, outFilePath) {
    var cFile = '';
    var breakPoints = new Set(); // a set to store all the breakpoints
    return new Promise<void>(resolve => {
        fs.readFile(inputfilepath, 'utf8', (err, loggingFileData) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            let commandsString = "";

            // Remove newline characters
            const singleLineLoggingFileData = loggingFileData.replace(/\n/g, ''); // convert all data in a single line
            const objects = singleLineLoggingFileData.split(/[><]/); // split all data by sepaerator ">"
            const jsonObjects = objects.map(obj => obj.trim()); // remove blankspaces


            //find commands in each request, reponse etc.
            for (const obj of jsonObjects) {
                // check breakpoint
                if (obj.includes('command": "setBreakpoints"') && !obj.includes('response')) {
                    try {
                        // Convert the string back to a JavaScript object
                        const dataInJsonForm = JSON.parse(obj);

                        for (const element of dataInJsonForm.arguments.breakpoints) {
                            breakPoints.add(element.line);
                        }
                    } catch (e) {
                        console.error('Error decoding JSON:', e);
                    }
                }

                // check next 
                if (obj.includes('command": "next"') && obj.includes('type": "request"')) {
                    commandsString += "n";
                }
                if (obj.includes('command": "continue"') && obj.includes('type": "request"')) { commandsString += "c"; }

                //check cFile path
                if (obj.includes('command": "setBreakpoints"') && obj.includes('type": "request"')) {
                    const dataInJsonForm = JSON.parse(obj);
                    cFile = dataInJsonForm.arguments.source.path;
                    // vscode.window.showInformationMessage(cFile);
                }
            }

            var content = "";
            for (const item of breakPoints) {
                content += "b " + "breakPointFunction" + item + "\n";
                console.log(typeof item);
            }
            for (const char of commandsString) {
                content += char + " \n";
            }

            // write in outputfile.txt
            fs.writeFile(outFilePath, content, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    return;
                }
                console.log('Content written to file successfully.');

            });


            // Read the input file
            const data = fs.readFileSync(cFile, 'utf8');
            // Split the data into lines
            const lines = data.split(/\r?\n/);
            // Write each line to the output file
            const homeDirectory = os.homedir();
            var modified_cFile = path.join(homeDirectory,'.Gambit/modified_Cfile.c');
            fs.writeFileSync(modified_cFile, ''); //clear the file
            var flag = true;
            lines.forEach((line, index) => {
                if (line[0] !== '#' && flag) {
                    breakPoints.forEach(function (value) {
                        fs.appendFileSync(modified_cFile, 'void breakPointFunction' + (value) + '{ return;}\n');
                    });
                    flag = false;
                }
                if (breakPoints.has(index + 1)) {
                    fs.appendFileSync(modified_cFile, 'breakPointFunction' + (index + 1) + '(); ');
                }
                fs.appendFileSync(modified_cFile, line + '\n');
            });

            resolve();

        });
    });
}


