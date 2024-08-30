"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
try {
    require("module-alias/register");
}
catch (e) {
    console.log("module-alias import error !");
}
const vscode = require("vscode");
const constant_1 = require("constant");
const left_webview_provider_1 = require("providers/left-webview-provider");
function activate(context) {
    let helloWorldCommand = vscode.commands.registerCommand("vscode-webview-extension-with-react.helloWorld", () => {
        vscode.window.showInformationMessage("Hello World from Gambit!");
    });
    context.subscriptions.push(helloWorldCommand);
    // Register view
    const leftPanelWebViewProvider = new left_webview_provider_1.LeftPanelWebview(context === null || context === void 0 ? void 0 : context.extensionUri, {});
    let view = vscode.window.registerWebviewViewProvider(constant_1.EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID, leftPanelWebViewProvider);
    context.subscriptions.push(view);
}
exports.activate = activate;
;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map