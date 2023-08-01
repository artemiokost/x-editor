"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _ImageBlock = require("./blocks/ImageBlock");

var _VideoBlock = require("./blocks/VideoBlock");

var _constants = require("../constants");

var _TwitterBlock = require("./blocks/TwitterBlock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Media = function (_Component) {
    _inherits(Media, _Component);

    function Media(props) {
        _classCallCheck(this, Media);

        var _this = _possibleConstructorReturn(this, (Media.__proto__ || Object.getPrototypeOf(Media)).call(this, props));

        _this.remove = function () {
            var editorState = _this.props.blockProps.getEditorState();
            var selection = editorState.getSelection();
            var content = editorState.getCurrentContent();
            var keyAfter = content.getKeyAfter(_this.props.block.key);
            var blockMap = content.getBlockMap().delete(_this.props.block.key);
            var withoutAtomicBlock = content.merge({
                blockMap: blockMap,
                selectionAfter: selection
            });

            var newState = _draftJs.EditorState.push(editorState, withoutAtomicBlock, "remove-range");

            if (keyAfter) {
                var newSelection = new _draftJs.SelectionState({
                    anchorKey: keyAfter,
                    anchorOffset: 0,
                    focusKey: keyAfter,
                    focusOffset: _this.props.block.getLength()
                });
                var newEditorState = _draftJs.EditorState.forceSelection(newState, newSelection);
                _this.onChange(newEditorState);
            } else {
                _this.onChange(newState);
            }
        };

        _this.updateData = function (data) {
            var editorState = _this.props.blockProps.getEditorState();
            var content = editorState.getCurrentContent();
            var selection = new _draftJs.SelectionState({
                anchorKey: _this.props.block.key,
                anchorOffset: 0,
                focusKey: _this.props.block.key,
                focusOffset: _this.props.block.getLength()
            });

            var newContentState = _draftJs.Modifier.mergeBlockData(content, selection, data);
            var newEditorState = _draftJs.EditorState.push(editorState, newContentState, "change-block-data");

            _this.onChange(newEditorState);
        };

        _this.state = {
            readOnly: _this.props.blockProps.readOnly
        };
        _this.onChange = _this.props.blockProps.onChange;
        return _this;
    }

    _createClass(Media, [{
        key: "render",
        value: function render() {
            var data = this.props.block.getData().toJS();
            var type = this.props.blockProps.type;
            return _react2.default.createElement(
                _react.Fragment,
                null,
                type === _constants.MEDIA_TYPE_IMAGE ? _react2.default.createElement(_ImageBlock.ImageBlock, { data: data }) : null,
                type === _constants.MEDIA_TYPE_VIDEO ? _react2.default.createElement(_VideoBlock.VideoBlock, { data: data }) : null,
                type === _constants.MEDIA_TYPE_TWITTER ? _react2.default.createElement(_TwitterBlock.TwitterBlock, { data: data }) : null
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
            return { readOnly: nextProps.readOnly };
        }
    }]);

    return Media;
}(_react.Component);

exports.default = Media;