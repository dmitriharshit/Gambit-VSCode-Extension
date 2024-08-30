import { WebviewViewProvider, WebviewView, Webview, Uri, EventEmitter, window } from "vscode";

import { Utils } from "utils";
import LeftPanel from 'components/LeftPanel';
import * as ReactDOMServer from "react-dom/server";
import * as vscode from "vscode";
const path = require('path');
import { createLogFile } from "../create_logfile";
import { logTrace } from '../log_trace';
import { appendLog } from '../appendlog';
import { runDocker } from '../rundocker';
import { highlightlines ,dehighlight} from "../highlightlines";
import { createdir } from "../createdir";
const fs = require('fs');
const os = require('os');

export class LeftPanelWebview implements WebviewViewProvider {
	constructor(
		private readonly extensionPath: Uri,
		private data: any,
		private _view: any = null
	) { }
	private onDidChangeTreeData: EventEmitter<any | undefined | null | void> = new EventEmitter<any | undefined | null | void>();

	refresh(context: any): void {
		this.onDidChangeTreeData.fire(null);
		this._view.webview.html = this._getHtmlForWebview(this._view?.webview);
	}

	//called when a view first becomes visible
	resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this.extensionPath],
		};
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
		this._view = webviewView;
		this.activateMessageListener();
	}

	private activateMessageListener() {
		this._view.webview.onDidReceiveMessage(async (message) => {
			switch (message.action) {
				case 'Show_log1':

					vscode.window.showInformationMessage("Gambit is now active");
					createdir().then(() => {
						logTrace();
					});
					break;
				case 'Show_log3':
					// Specify the directory name you want to create
					dehighlight();
					const homeDirectory = os.homedir();
					const inputfilepath = path.join(homeDirectory, '.Gambit/loggingGambit.txt');
					const outFilePath = path.join(homeDirectory, '.Gambit/commands.txt');

					createLogFile(inputfilepath, outFilePath).then(() => {
						appendLog(outFilePath, message.data.fme1, message.data.fme2, message.data.fme3).then(() => {
							runDocker().then(() => {
								//printing output in outputbox
								const message = fs.readFileSync(`${homeDirectory}/.Gambit/.gambit_ext_out.json`, 'utf8');
								this._view.webview.postMessage(message);
								highlightlines(message);
							});
						});
					});

					break;
				default:
					break;
			}
		});
	}

	private _getHtmlForWebview(webview: Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		// Script to handle user action
		const scriptUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "left-webview-provider.js")
		);
		const constantUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "constant.js")
		);
		// CSS file to handle styling
		const styleUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "left-webview-provider.css")
		);

		//vscode-icon file from codicon lib
		const codiconsUri = webview.asWebviewUri(
			Uri.joinPath(this.extensionPath, "script", "codicon.css")
		);

		// Use a nonce to only allow a specific script to be run.
		const nonce = Utils.getNonce();

		return `<html>
                <head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="Content-Security-Policy" 
                            content="default-src 'none';
                            img-src vscode-resource: https:;
                            font-src ${webview.cspSource};
                            style-src ${webview.cspSource} 'unsafe-inline';
                            script-src 'nonce-${nonce}'
							
							;">             

                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="${codiconsUri}" rel="stylesheet" />
                    <link href="${styleUri}" rel="stylesheet">

                </head>
                <body>

				<div style="text-align:center;color: white;">
					<div style="height: 20px;"></div>
					<img src="https://cdn-icons-png.flaticon.com/128/7926/7926076.png"/ style="filter:  brightness(0) invert(1);width: 60px;height: 60px;">
					<div style="height: 4px;"></div>
					<h3 style="margin: 0px 0px;">Gambit Extension</h3>
					<div style="height: 10px;"></div>
					<div style="height: 10px;"></div>
				</div>
			
				
                    ${ReactDOMServer.renderToString((
			<LeftPanel message={""}></LeftPanel>
		))
			}
					<script nonce="${nonce}" type="text/javascript" src="${constantUri}"></script>
					<script nonce="${nonce}" src="${scriptUri}"></script>
				</body>
            </html>`;
	}
}