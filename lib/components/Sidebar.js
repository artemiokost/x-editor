"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.SideMenu = exports.ToggleButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _icons = require("../icons");

var _icons2 = _interopRequireDefault(_icons);

var _ImageButton = require("./buttons/ImageButton");

var _ImageButton2 = _interopRequireDefault(_ImageButton);

var _VideoButton = require("./buttons/VideoButton");

var _VideoButton2 = _interopRequireDefault(_VideoButton);

var _TwitterButton = require("./buttons/TwitterButton");

var _TwitterButton2 = _interopRequireDefault(_TwitterButton);

var _utils = require("../utils");

require("setimmediate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockStyles = function (_Component) {
    _inherits(BlockStyles, _Component);

    function BlockStyles(props) {
        _classCallCheck(this, BlockStyles);

        var _this = _possibleConstructorReturn(this, (BlockStyles.__proto__ || Object.getPrototypeOf(BlockStyles)).call(this, props));

        _this.onChange = function (editorState) {
            return _this.props.onChange(editorState);
        };

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(BlockStyles, [{
        key: "render",
        value: function render() {
            var className = (0, _classnames2.default)("sidemenu__items", { "sidemenu__items--open": this.props.open });
            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    "ul",
                    { className: className },
                    _react2.default.createElement(
                        "li",
                        { className: "sidemenu__item" },
                        _react2.default.createElement(_ImageButton2.default, {
                            className: "sidemenu__button",
                            editorState: this.props.editorState,
                            i18n: this.props.i18n,
                            onChange: this.onChange,
                            title: "Image" })
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "sidemenu__item" },
                        _react2.default.createElement(_VideoButton2.default, {
                            className: "sidemenu__button",
                            editorState: this.props.editorState,
                            i18n: this.props.i18n,
                            onChange: this.onChange,
                            title: "Video" })
                    ),
                    _react2.default.createElement(
                        "li",
                        { className: "sidemenu__item" },
                        _react2.default.createElement(_TwitterButton2.default, {
                            className: "sidemenu__button",
                            editorState: this.props.editorState,
                            i18n: this.props.i18n,
                            onChange: this.onChange,
                            title: "Twitter" })
                    )
                )
            );
        }
    }]);

    return BlockStyles;
}(_react.Component);

var ToggleButton = exports.ToggleButton = function (_Component2) {
    _inherits(ToggleButton, _Component2);

    function ToggleButton() {
        _classCallCheck(this, ToggleButton);

        return _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).apply(this, arguments));
    }

    _createClass(ToggleButton, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.props.hideSidebarOnBlur && !this.props.hasFocus) {
                return null;
            }

            var Icon = _icons2.default.CrossIcon;

            var className = (0, _classnames2.default)("sidemenu__button", { "sidemenu__button--open": this.props.open });

            return _react2.default.createElement(
                "button",
                {
                    type: "button",
                    ref: function ref(el) {
                        return _this3.button = el;
                    },
                    className: className,
                    onClick: function onClick() {
                        _this3.button.focus();
                        _this3.props.toggle();
                    } },
                _react2.default.createElement(Icon, { className: "sidemenu__button__icon" })
            );
        }
    }]);

    return ToggleButton;
}(_react.Component);

var SideMenu = exports.SideMenu = function (_Component3) {
    _inherits(SideMenu, _Component3);

    function SideMenu(props) {
        _classCallCheck(this, SideMenu);

        var _this4 = _possibleConstructorReturn(this, (SideMenu.__proto__ || Object.getPrototypeOf(SideMenu)).call(this, props));

        _this4.onChange = function (editorState) {
            return _this4.props.onChange(editorState);
        };

        _this4.toggle = function () {
            return _this4.setState({ open: !_this4.state.open });
        };

        _this4.state = {
            open: false
        };
        return _this4;
    }

    _createClass(SideMenu, [{
        key: "render",
        value: function render() {
            var className = (0, _classnames2.default)("sidemenu", { "sidemenu--open": this.state.open });
            return _react2.default.createElement(
                "li",
                { className: className },
                _react2.default.createElement(ToggleButton, {
                    toggle: this.toggle,
                    hasFocus: this.props.editorHasFocus || this.state.open,
                    hideSidebarOnBlur: this.props.hideSidebarOnBlur,
                    open: this.state.open }),
                _react2.default.createElement(BlockStyles, {
                    i18n: this.props.i18n,
                    editorState: this.props.editorState,
                    open: this.state.open,
                    onChange: this.onChange })
            );
        }
    }]);

    return SideMenu;
}(_react.Component);

var SideBar = function (_Component4) {
    _inherits(SideBar, _Component4);

    function SideBar(props) {
        _classCallCheck(this, SideBar);

        var _this5 = _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));

        _this5.onChange = function (editorState) {
            return _this5.props.onChange(editorState);
        };

        _this5.state = { top: -4 };
        return _this5;
    }

    _createClass(SideBar, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var _this6 = this;

            if (this.updatingPosition) {
                clearImmediate(this.updatingPosition);
            }
            this.updatingPosition = null;
            this.updatingPosition = setImmediate(function () {
                return _this6.setBarPosition();
            });
        }
    }, {
        key: "setBarPosition",
        value: function setBarPosition() {
            var container = _reactDom2.default.findDOMNode(this.containerEl);
            var editor = container ? container.parentElement : null;

            var selection = window.getSelection();
            if (selection.rangeCount === 0) {
                return null;
            }

            var element = (0, _utils.getSelectedBlockElement)(selection.getRangeAt(0));

            if (!element || !container || !editor || !editor.contains(element)) {
                return;
            }

            var containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
            var top = element.getBoundingClientRect().top - 4 - containerTop;
            top = Math.max(-4, Math.floor(top));

            if (this.state.top !== top) {
                this.setState({ top: top });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            if (this.props.readOnly) {
                return null;
            }
            return _react2.default.createElement(
                "div",
                {
                    ref: function ref(el) {
                        return _this7.containerEl = el;
                    },
                    className: "sidebar" },
                _react2.default.createElement(
                    "div",
                    { style: { top: this.state.top + "px" }, className: "sidebar__menu" },
                    _react2.default.createElement(
                        "ul",
                        { className: "sidebar__sidemenu-wrapper" },
                        _react2.default.createElement(SideMenu, {
                            editorHasFocus: this.props.editorHasFocus,
                            editorState: this.props.editorState,
                            hideSidebarOnBlur: this.props.hideSidebarOnBlur,
                            i18n: this.props.i18n,
                            onChange: this.onChange })
                    )
                )
            );
        }
    }]);

    return SideBar;
}(_react.Component);

exports.default = SideBar;