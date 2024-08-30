"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable @typescript-eslint/naming-convention */
const Button_1 = require("components/Button");
const panel_1 = require("components/panel");
const output_1 = require("components/output");
function LeftPanel({ message }) {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'panel-wrapper' }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: 'panel-info' }, { children: message }), void 0), (0, jsx_runtime_1.jsx)(Button_1.Button1, {}, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(panel_1.Form, {}, void 0), (0, jsx_runtime_1.jsx)("br", {}, void 0), (0, jsx_runtime_1.jsx)(output_1.Input, {}, void 0)] }), void 0));
}
exports.default = LeftPanel;
//# sourceMappingURL=LeftPanel.js.map