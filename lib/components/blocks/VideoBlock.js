"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VideoBlock = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoBlock = exports.VideoBlock = function VideoBlock(_ref) {
    var data = _ref.data;
    return _react2.default.createElement(
        "div",
        { className: "video" },
        _react2.default.createElement("iframe", { src: data.src, title: "video", allowFullScreen: true })
    );
};