"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/naming-convention */
const constant_1 = require("constant");
function Input() {
    return ((0, jsx_runtime_1.jsx)("input", { type: "textbox", id: constant_1.EXTENSION_CONSTANT.ELEMENT_IDS.outputbox, name: 'outputarea', className: 'outputarea', readOnly: true }, void 0));
}
exports.Input = Input;
//# sourceMappingURL=output.js.map