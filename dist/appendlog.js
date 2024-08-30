"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendLog = void 0;
const fs = require('fs');
function appendLog(inputfilepath, content, machine, command) {
    return new Promise(resolve => {
        fs.appendFile(inputfilepath, command + " {" + machine + "} " + content + '\n', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('Content appended to file successfully.');
        });
        resolve();
    });
}
exports.appendLog = appendLog;
//# sourceMappingURL=appendlog.js.map