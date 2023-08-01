"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _draftJs = require("draft-js");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = (_temp = _class = function (_Component) {
    _inherits(Toolbar, _Component);

    function Toolbar(props) {
        _classCallCheck(this, Toolbar);

        var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            show: false,
            editingEntity: null,
            link: "",
            error: null
        };
        return _this;
    }

    _createClass(Toolbar, [{
        key: "toggleInlineStyle",
        value: function toggleInlineStyle(inlineStyle) {
            var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
            this.props.onChange(newEditorState);
        }
    }, {
        key: "setBarPosition",
        value: function setBarPosition() {
            var editor = this.props.editor;
            var toolbar = this.toolbarEl;
            var selectionCoords = (0, _utils.getSelectionCoords)(editor, toolbar);

            if (!selectionCoords) {
                return null;
            }

            if (selectionCoords && !this.state.position || this.state.position.top !== selectionCoords.offsetTop || this.state.position.left !== selectionCoords.offsetLeft || this.state.arrowStyle !== selectionCoords.arrowStyle || !this.state.show) {
                this.setState({
                    show: true,
                    position: {
                        top: selectionCoords.offsetTop,
                        left: selectionCoords.offsetLeft
                    },
                    arrowStyle: selectionCoords.arrowStyle
                });
            }
        }
    }, {
        key: "handleSetToolbar",
        value: function handleSetToolbar() {
            if (this.props.shouldDisplayToolbarFn(this.props, this.state)) {
                this.shouldUpdatePos = false;
                return this.setBarPosition();
            } else {
                if (this.state.show) {
                    this.setState({
                        show: false,
                        editingEntity: null,
                        link: "",
                        error: null
                    });
                }
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var currentContentState = this.props.editorState.getCurrentContent();
            var newContentState = nextProps.editorState.getCurrentContent();

            if (currentContentState === newContentState) {
                this.shouldUpdatePos = true;
                this.setState({
                    show: true
                });
            } else {
                this.setState({
                    show: false
                });
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.shouldUpdatePos) {
                this.handleSetToolbar();
            }
        }
    }, {
        key: "getCurrentEntityKey",
        value: function getCurrentEntityKey() {
            var selection = this.props.editorState.getSelection();
            var anchorKey = selection.getAnchorKey();
            var contentState = this.props.editorState.getCurrentContent();
            var anchorBlock = contentState.getBlockForKey(anchorKey);
            var offset = selection.anchorOffset;
            var index = selection.isBackward ? offset - 1 : offset;
            return anchorBlock.getEntityAt(index);
        }
    }, {
        key: "getCurrentEntity",
        value: function getCurrentEntity() {
            var contentState = this.props.editorState.getCurrentContent();
            var entityKey = this.getCurrentEntityKey();
            return entityKey ? contentState.getEntity(entityKey) : null;
        }
    }, {
        key: "hasEntity",
        value: function hasEntity(entityType) {
            var entity = this.getCurrentEntity();
            return !!(entity && entity.getType() === entityType);
        }
    }, {
        key: "setEntity",
        value: function setEntity(entityType, data) {
            var mutability = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "MUTABLE";
            var editorState = this.props.editorState;

            var contentState = editorState.getCurrentContent();
            var contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
            var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
            var selectionState = _draftJs.EditorState.forceSelection(newState, editorState.getSelection());

            this.props.onChange(selectionState);
        }
    }, {
        key: "renderEntityInput",
        value: function renderEntityInput(entityType) {
            var _this2 = this;

            if (!this.props.entityInputs) {
                console.warn("no entityInputs provided");
                return null;
            }
            var Component = this.props.entityInputs[entityType];
            var setEntity = function setEntity(data, mutability) {
                return _this2.setEntity(entityType, data, mutability);
            };
            var entityData = {};
            var entity = null;
            if (this.hasEntity(entityType)) {
                entity = this.getCurrentEntity();
                if (entity) {
                    entityData = entity.getData();
                }
            }
            if (Component) {
                return _react2.default.createElement(Component, _extends({
                    i18n: this.props.i18n,
                    editorState: this.props.editorState,
                    setEntity: setEntity,
                    entityType: entityType,
                    onChange: this.props.onChange,
                    cancelEntity: this.cancelEntity,
                    removeEntity: this.removeEntity,
                    setError: this.setError,
                    cancelError: this.cancelError,
                    entity: entity
                }, entityData));
            } else {
                console.warn("unknown entity type: " + entityType);
                return null;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.props.readOnly) {
                return null;
            }

            var toolbarClass = (0, _classnames2.default)("toolbar", {
                "toolbar--open": this.state.show,
                "toolbar--error": this.state.error
            });

            return _react2.default.createElement(
                "div",
                {
                    className: toolbarClass,
                    style: this.state.position,
                    ref: "toolbarWrapper",
                    onMouseDown: function onMouseDown(e) {
                        return e.preventDefault();
                    } },
                _react2.default.createElement(
                    "div",
                    { style: { position: "absolute", bottom: 0 } },
                    _react2.default.createElement(
                        "div",
                        {
                            className: "toolbar__wrapper",
                            ref: function ref(el) {
                                return _this3.toolbarEl = el;
                            } },
                        this.state.editingEntity ? this.renderEntityInput(this.state.editingEntity) : this.renderToolList(),
                        _react2.default.createElement(
                            "p",
                            { className: "toolbar__error-msg" },
                            this.state.error
                        ),
                        _react2.default.createElement("span", {
                            className: "toolbar__arrow",
                            ref: function ref(el) {
                                return _this3.arrowEl = el;
                            },
                            style: this.state.arrowStyle })
                    )
                )
            );
        }
    }]);

    return Toolbar;
}(_react.Component), _class.defaultProps = {
    shouldDisplayToolbarFn: function shouldDisplayToolbarFn(props, state) {
        return (props.editorHasFocus || state.editingEntity) && !props.editorState.getSelection().isCollapsed();
    }
}, _class.propTypes = { editorHasFocus: _propTypes2.default.bool }, _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.toggleBlockType = function (blockType) {
        return _this4.props.onChange(_draftJs.RichUtils.toggleBlockType(_this4.props.editorState, blockType));
    };

    this.toggleEntity = function (entity) {
        return _this4.setState({ editingEntity: entity });
    };

    this.renderButton = function (item, position) {
        var current = null;
        var toggle = null;
        var active = null;
        var key = item.label;

        switch (item.type) {
            case "custom":
                {
                    key = "custom-" + position;
                    toggle = function toggle() {
                        return item.action(_this4.props.editorState, _this4.props.onChange);
                    };
                    break;
                }
            case "inline":
                {
                    current = _this4.props.editorState.getCurrentInlineStyle();
                    toggle = function toggle() {
                        return _this4.toggleInlineStyle(item.style);
                    };
                    active = current.has(item.style);
                    break;
                }
            case "block":
                {
                    var selection = _this4.props.editorState.getSelection();
                    current = _this4.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
                    toggle = function toggle() {
                        return _this4.toggleBlockType(item.style);
                    };
                    active = item.style === current;
                    break;
                }
            case "separator":
                {
                    key = "sep-" + position;
                    break;
                }
            case "entity":
                {
                    var _item$entity = item.entity,
                        entity = _item$entity === undefined ? "LINK" : _item$entity;

                    key = "entity-" + entity;
                    toggle = function toggle() {
                        return _this4.toggleEntity(entity);
                    };
                    active = _this4.hasEntity(entity);
                    break;
                }
            default:
                break;
        }

        return _react2.default.createElement(_ToolbarItem2.default, { key: key, active: active, toggle: toggle, item: item });
    };

    this.setError = function (errorMsg) {
        return _this4.setState({ error: errorMsg });
    };

    this.cancelError = function () {
        return _this4.setState({ error: null });
    };

    this.removeEntity = function () {
        var editorState = _this4.props.editorState;

        var selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            _this4.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
        }
        _this4.cancelEntity();
    };

    this.cancelEntity = function () {
        _this4.setState({ editingEntity: null, error: null }, function () {
            _this4.props.draft && _this4.props.draft.focus();
        });
    };

    this.renderToolList = function () {
        return _react2.default.createElement(
            "ul",
            { className: "toolbar__list" },
            _this4.props.actions.map(_this4.renderButton)
        );
    };
}, _temp);
exports.default = Toolbar;