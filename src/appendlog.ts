const fs = require('fs');
import * as vscode from 'vscode';

export function appendLog(inputfilepath, content,machine,command) {
    return new Promise<void>(resolve => {
        fs.appendFile(inputfilepath, command + " {" + machine+ "} " + content + '\n', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('Content appended to file successfully.');
        });

        resolve();
    });
}