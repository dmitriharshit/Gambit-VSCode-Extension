import * as vscode from 'vscode';
const path = require('path');
const os = require('os');

export function logTrace() {
    vscode.debug.onDidStartDebugSession(x => {
		const homeDirectory = os.homedir();
        const filePath = path.join(homeDirectory, ".Gambit/loggingGambit.txt");
        fs.writeFileSync(filePath,''); //clear the file

        x.customRequest('stackTrace', { threadId: 1 }).then(reply => {
            const frameId = reply.stackFrames && reply.stackFrames.length > 0 ? reply.stackFrames[0].id : null;
        }, error => {
            vscode.window.showInformationMessage(`error: ${error.message}`);
        });
        

    });
    vscode.debug.onDidChangeActiveDebugSession(_c => {
        var b = vscode.debug.breakpoints[0];
    });

    const fs = require('fs');

    vscode.debug.registerDebugAdapterTrackerFactory('*', {
        createDebugAdapterTracker(_session: vscode.DebugSession) {
            const process = require('process');

            // Printing current directory
            // let cwd = process.cwd();
            const homeDirectory = os.homedir();
            const filePath = path.join(homeDirectory, ".Gambit/loggingGambit.txt");
            return {
                onWillReceiveMessage: m => fs.appendFileSync(filePath, `> ${JSON.stringify(m, undefined, 2)}`),
                onDidSendMessage: m => fs.appendFileSync(filePath, `< ${JSON.stringify(m, undefined, 2)}`)
            };
        }
    });
}