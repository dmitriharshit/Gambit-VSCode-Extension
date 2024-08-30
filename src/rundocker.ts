import * as vscode from 'vscode';
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
export function runDocker() {
    return new Promise<void>(resolve => {
        const homeDirectory = os.homedir();
        const dirpath = path.join(homeDirectory, '.Gambit');
        exec('docker stop Gambit');
        exec('docker container rm Gambit');
        exec(`docker run -d -t -v ${dirpath}:/root/data --name Gambit pkalita595/mock_gambit`, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Failed to run Docker image: ${error.message}`);
                return;
            }
            if (stderr) {
                vscode.window.showErrorMessage(`Docker error: ${stderr}`);
                return;
            }

            exec('docker exec -w /root/ Gambit python run_gambit.py data/commands.txt data/modified_Cfile.c', (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage('Failed to execute Docker image: ${ error.message }');
                    return;
                }

                if (stderr) {
                    vscode.window.showErrorMessage('Docker error: ${ stderr }');
                    return;
                }
                exec('docker stop Gambit');
                exec('docker container rm Gambit');
                resolve();
            });
        });
    });
}