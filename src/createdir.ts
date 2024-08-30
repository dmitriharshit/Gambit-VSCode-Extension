const fs = require('fs');
import * as vscode from "vscode";
const os =require('os');
const path = require('path');

export function createdir() {
	return new Promise<void>(resolve => {
		// const directoryName = '/tmp/Gambit';
		const homeDirectory = os.homedir();
		const directoryName = path.join(homeDirectory, '.Gambit');
		// Check if the directory already exists
		if (fs.existsSync(directoryName)) {
			// vscode.window.showInformationMessage('Directory already exists');
		} else {
			// Use fs.mkdir to create the directory
			fs.mkdir(directoryName, (err) => {
				if (err) {
					vscode.window.showInformationMessage('Error creating directory:', err);
				} else {
					vscode.window.showInformationMessage('Directory created successfully');
				}
			});
		}
		resolve();
	});
}