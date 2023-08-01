"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Toolbar = require("./Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _i18n = require("../i18n");

var _i18n2 = _interopRequireDefault(_i18n);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _Media = require("./Media");

var _Media2 = _interopRequireDefault(_Media);

var _Sidebar = require("./Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _draftJs = require("draft-js");

var _default = require("../actions/default");

var _default2 = _interopRequireDefault(_default);

var _default3 = require("../entity_inputs/default");

var _default4 = _interopRequireDefault(_default3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

var VortexEditor = (_temp = _class = function (_Component) {
    _inherits(VortexEditor, _Component);

    function VortexEditor(props) {
        _classCallCheck(this, VortexEditor);

        var _this = _possibleConstructorReturn(this, (VortexEditor.__proto__ || Object.getPrototypeOf(VortexEditor)).call(this, props));

        _this.hideLastEmptyParagraph = function () {
            if (_this.props.readOnly === true) {
                var paragraphArray = _this.editorEl.getElementsByClassName("paragraph");
                var lastParagraph = paragraphArray.item(paragraphArray.length - 1);
                if (lastParagraph.getElementsByTagName("br").length > 0) {
                    lastParagraph.hidden = true;
                    _this.setState({ lastParagraph: lastParagraph });
                } else {
                    _this.setState({ lastParagraph: null });
                }
            } else {
                if (_this.state.lastParagraph !== null) _this.state.lastParagraph.hidden = false;
            }
        };

        _this.onChange = function (editorState) {
            return _this.props.onChange(editorState);
        };

        _this.externalKeyBindings = function (e) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.keyBindings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var kb = _step.value;

                    if (kb.isKeyBound(e)) return kb.name;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return (0, _draftJs.getDefaultKeyBinding)(e);
        };

        _this.onTab = function (event) {
            if (_this.props.onTab) _this.props.onTab(event);
        };

        _this.handleKeyCommand = function (command) {
            if (_this.keyBindings.length) {
                var extKb = _this.keyBindings.find(function (kb) {
                    return kb.name === command;
                });
                if (extKb) {
                    extKb.action();
                    return true;
                }
            }

            var editorState = _this.props.editorState;

            var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                _this.props.onChange(newState);
                return true;
            }
            return false;
        };

        _this.handleReturn = function (event) {
            if (_this.props.softNewLines === false) {
                return false;
            }

            if (!event.shiftKey) {
                var _editorState = _this.props.editorState;

                var selection = _editorState.getSelection();
                var contentState = _editorState.getCurrentContent();
                var currentBlock = contentState.getBlockForKey(selection.getEndKey());
                var endOffset = selection.getEndOffset();
                var atEndOfBlock = endOffset === currentBlock.getLength();
                var resetStyleNewLine = _this.props.resetStyleNewLine;
                var noReset = _this.blocksWithoutStyleReset.includes(currentBlock.type);

                if (atEndOfBlock && resetStyleNewLine) {
                    var blockType = noReset ? currentBlock.type : "unstyled";
                    _this.resetBlockStyle(_editorState, selection, contentState, currentBlock, blockType);
                    return true;
                }
                return false;
            }

            var editorState = _this.props.editorState;


            var currentContent = editorState.getCurrentContent();
            var currentSelection = editorState.getSelection();
            var contentBlock = currentContent.getBlockMap().get(currentSelection.getFocusKey());
            var contentText = contentBlock.getText();

            if (contentText.charAt(currentSelection.focusOffset - 1) === "\n" || contentText.charAt(currentSelection.focusOffset) === "\n") {
                return false;
            }

            var newState = _draftJs.RichUtils.insertSoftNewline(editorState);
            _this.props.onChange(newState);
            return true;
        };

        _this.focus = function () {
            return _this.draftEl.focus();
        };

        _this.handleFocus = function () {
            clearTimeout(_this.blurTimeoutID);
            if (!_this.state.hasFocus) _this.setState({ hasFocus: true });
        };

        _this.handleBlur = function () {
            _this.blurTimeoutID = setTimeout(function () {
                if (_this.state.hasFocus) _this.setState({ hasFocus: false });
            }, 200);
        };

        _this.mediaBlockRenderer = function (block) {
            var handled = _this.props.blockRendererFn(block);

            if (handled) return handled;
            if (block.getType() !== "atomic") return null;

            var type = block.getData().toObject().type;

            return {
                component: _Media2.default,
                editable: false,
                props: {
                    editorState: _this.props.editorState,
                    i18n: _this.props.i18n[_this.props.language],
                    onChange: _this.onChange,
                    type: type
                }
            };
        };

        _this.getEditorState = function () {
            return _this.props.editorState;
        };

        _this.state = {
            lastParagraph: null,
            readOnly: _this.props.readOnly || false,
            hasFocus: false
        };
        _this.entityInputs = _this.props.entityInputs || _default4.default;
        _this.blocksWithoutStyleReset = _this.props.blocksWithoutStyleReset || NO_RESET_STYLE_DEFAULT;
        _this.keyBindings = _this.props.keyBindings || [];
        return _this;
    }

    _createClass(VortexEditor, [{
        key: "componentDidMount",
        value: function componentDidMount(prevProps, prevState, snapshot) {
            if (this.props.readOnly) this.hideLastEmptyParagraph();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.readOnly !== prevProps.readOnly) this.hideLastEmptyParagraph();
            if (this.props.readOnly && this.props.editorState !== prevProps.editorState) this.hideLastEmptyParagraph();
        }
    }, {
        key: "resetBlockStyle",
        value: function resetBlockStyle(editorState, selection, contentState, currentBlock, blockType) {
            var List = _immutable2.default.List;

            var emptyBlockKey = (0, _draftJs.genKey)();

            var emptyBlock = new _draftJs.ContentBlock({
                key: emptyBlockKey,
                text: "",
                type: blockType,
                depth: 0,
                characterList: List(),
                inlineStyleRanges: []
            });
            var blockMap = contentState.getBlockMap();

            var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
                return v === currentBlock;
            });
            var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
                return v === currentBlock;
            }).rest();

            var augmentedBlocks = [[currentBlock.getKey(), currentBlock], [emptyBlockKey, emptyBlock]];

            var focusKey = emptyBlockKey;
            var newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
            var newContentState = contentState.merge({
                blockMap: newBlocks,
                selectionBefore: selection,
                selectionAfter: selection.merge({
                    anchorKey: focusKey,
                    anchorOffset: 0,
                    focusKey: focusKey,
                    focusOffset: 0,
                    isBackward: false
                })
            });
            var noStyle = _immutable2.default.OrderedSet([]);
            var resetState = _draftJs.EditorState.push(editorState, newContentState, "split-block");
            var emptySelection = _draftJs.SelectionState.createEmpty(emptyBlockKey);
            var editorSelected = _draftJs.EditorState.forceSelection(resetState, emptySelection);
            var noStyleState = _draftJs.EditorState.setInlineStyleOverride(editorSelected, noStyle);
            this.props.onChange(noStyleState);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearTimeout(this.blurTimeoutID);
        }
    }, {
        key: "renderSidebar",
        value: function renderSidebar(props) {
            var sidebarRendererFn = this.props.sidebarRendererFn;

            if (typeof sidebarRendererFn === "function") {
                return sidebarRendererFn(props);
            }
            return _react2.default.createElement(_Sidebar2.default, props);
        }
    }, {
        key: "renderToolbar",
        value: function renderToolbar(props) {
            var _props$Toolbar = this.props.Toolbar,
                Toolbar = _props$Toolbar === undefined ? _Toolbar2.default : _props$Toolbar;

            return _react2.default.createElement(Toolbar, props);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var hideSidebarOnBlur = this.props.hideSidebarOnBlur || false;
            var i18n = this.props.i18n[this.props.language];

            var className = "x-editor";
            if (this.state.readOnly) className += " read-only";

            return _react2.default.createElement(
                "div",
                { className: "vortex" },
                _react2.default.createElement(
                    "div",
                    {
                        className: className,
                        id: this.props.id || "x-editor",
                        ref: function ref(el) {
                            return _this2.editorEl = el;
                        },
                        onBlur: this.handleBlur,
                        onFocus: this.handleFocus },
                    this.renderSidebar({
                        editorHasFocus: this.state.hasFocus,
                        editorState: this.props.editorState,
                        hideSidebarOnBlur: hideSidebarOnBlur,
                        i18n: i18n,
                        onChange: this.onChange,
                        readOnly: this.state.readOnly
                    }),
                    _react2.default.createElement(_draftJs.Editor, _extends({}, this.props, {
                        ref: function ref(el) {
                            return _this2.draftEl = el;
                        },
                        readOnly: this.state.readOnly,
                        blockRendererFn: this.mediaBlockRenderer,
                        blockStyleFn: VortexEditor.blockStyleFn || VortexEditor.blockStyleFn,
                        onTab: this.onTab,
                        handleKeyCommand: this.handleKeyCommand,
                        handleReturn: this.props.handleReturn || this.handleReturn,
                        keyBindingFn: this.externalKeyBindings,
                        onChange: this.onChange })),
                    this.renderToolbar({
                        actions: this.props.actions,
                        draft: this.draftEl,
                        editor: this.editorEl,
                        editorState: this.props.editorState,
                        editorHasFocus: this.state.hasFocus,
                        entityInputs: this.entityInputs,
                        i18n: i18n,
                        onChange: this.onChange,
                        readOnly: this.state.readOnly,
                        shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn
                    })
                )
            );
        }
    }], [{
        key: "blockStyleFn",
        value: function blockStyleFn(contentBlock) {
            var type = contentBlock.getType();
            if (type === "unstyled") return "paragraph";
        }
    }, {
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps, prevState) {
            return { readOnly: nextProps.readOnly || false };
        }
    }]);

    return VortexEditor;
}(_react.Component), _class.defaultProps = {
    actions: _default2.default,
    blockRendererFn: function blockRendererFn() {},
    i18n: _i18n2.default,
    language: "ru-RU"
}, _temp);
exports.default = VortexEditor;