"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TwitterBlock = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactTwitterEmbed = require("react-twitter-embed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwitterBlock = exports.TwitterBlock = function TwitterBlock(_ref) {
    var data = _ref.data;
    return _react2.default.createElement(
        "div",
        { className: "twitter-embed" },
        _react2.default.createElement(_reactTwitterEmbed.TwitterTweetEmbed, { tweetId: data.tweetId, onLoad: function onLoad(e) {
                return e.style = null;
            } })
    );
};