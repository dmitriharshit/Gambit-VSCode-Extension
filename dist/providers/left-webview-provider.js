"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftPanelWebview = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const vscode_1 = require("vscode");
const utils_1 = require("utils");
const LeftPanel_1 = require("components/LeftPanel");
const ReactDOMServer = require("react-dom/server");
const vscode = require("vscode");
const path = require('path');
const create_logfile_1 = require("../create_logfile");
const log_trace_1 = require("../log_trace");
const appendlog_1 = require("../appendlog");
const rundocker_1 = require("../rundocker");
const highlightlines_1 = require("../highlightlines");
const createdir_1 = require("../createdir");
const fs = require('fs');
const os = require('os');
class LeftPanelWebview {
    constructor(extensionPath, data, _view = null) {
        this.extensionPath = extensionPath;
        this.data = data;
        this._view = _view;
        this.onDidChangeTreeData = new vscode_1.EventEmitter();
    }
    refresh(context) {
        var _a;
        this.onDidChangeTreeData.fire(null);
        this._view.webview.html = this._getHtmlForWebview((_a = this._view) === null || _a === void 0 ? void 0 : _a.webview);
    }
    //called when a view first becomes visible
    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionPath],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        this._view = webviewView;
        this.activateMessageListener();
    }
    activateMessageListener() {
        this._view.webview.onDidReceiveMessage((message) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            switch (message.action) {
                case 'Show_log1':
                    vscode.window.showInformationMessage("Gambit is now active");
                    (0, createdir_1.createdir)().then(() => {
                        (0, log_trace_1.logTrace)();
                    });
                    break;
                case 'Show_log3':
                    // Specify the directory name you want to create
                    (0, highlightlines_1.dehighlight)();
                    const homeDirectory = os.homedir();
                    const inputfilepath = path.join(homeDirectory, '.Gambit/loggingGambit.txt');
                    const outFilePath = path.join(homeDirectory, '.Gambit/commands.txt');
                    (0, create_logfile_1.createLogFile)(inputfilepath, outFilePath).then(() => {
                        (0, appendlog_1.appendLog)(outFilePath, message.data.fme1, message.data.fme2, message.data.fme3).then(() => {
                            (0, rundocker_1.runDocker)().then(() => {
                                //printing output in outputbox
                                const message = fs.readFileSync(`${homeDirectory}/.Gambit/.gambit_ext_out.json`, 'utf8');
                                this._view.webview.postMessage(message);
                                (0, highlightlines_1.highlightlines)(message);
                            });
                        });
                    });
                    break;
                default:
                    break;
            }
        }));
    }
    _getHtmlForWebview(webview) {
        // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
        // Script to handle user action
        const scriptUri = webview.asWebviewUri(vscode_1.Uri.joinPath(this.extensionPath, "script", "left-webview-provider.js"));
        const constantUri = webview.asWebviewUri(vscode_1.Uri.joinPath(this.extensionPath, "script", "constant.js"));
        // CSS file to handle styling
        const styleUri = webview.asWebviewUri(vscode_1.Uri.joinPath(this.extensionPath, "script", "left-webview-provider.css"));
        //vscode-icon file from codicon lib
        const codiconsUri = webview.asWebviewUri(vscode_1.Uri.joinPath(this.extensionPath, "script", "codicon.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = utils_1.Utils.getNonce();
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
			
				
                    ${ReactDOMServer.renderToString(((0, jsx_runtime_1.jsx)(LeftPanel_1.default, { message: "" }, void 0)))}
					<script nonce="${nonce}" type="text/javascript" src="${constantUri}"></script>
					<script nonce="${nonce}" src="${scriptUri}"></script>
				</body>
            </html>`;
    }
}
exports.LeftPanelWebview = LeftPanelWebview;
//# sourceMappingURL=left-webview-provider.js.map