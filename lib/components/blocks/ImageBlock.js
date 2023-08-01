"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageBlock = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageBlock = exports.ImageBlock = function ImageBlock(_ref) {
    var data = _ref.data;
    return _react2.default.createElement(
        "div",
        { className: "image" },
        _react2.default.createElement("img", { src: data.src, alt: "" })
    );
};