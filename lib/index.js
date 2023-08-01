"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _VortexEditor = require("./components/VortexEditor");

var _VortexEditor2 = _interopRequireDefault(_VortexEditor);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

        _this.onChange = function (editorState) {
            return _this.setState({ editorState: editorState });
        };

        _this.render = function () {
            return _react2.default.createElement(_VortexEditor2.default, { editorState: _this.state.editorState, onChange: _this.onChange,
                readOnly: _this.props.readOnly });
        };

        _this.state = {
            editorState: (0, _utils.editorStateFromRaw)({
                "blocks": [{
                    "key": "bcto0",
                    "text": "Второй сезон сериала \"Американские боги\" по одноимённому роману Нила Геймана начнётся 10 марта 2019 года. Об этом сообщило издание Vulture, которое также опубликовало постер продолжения.",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                }, {
                    "key": "dmd7b",
                    "text": "В новом сезоне \"Американских богов\" главные герои книги и её сериальной адаптации Тень и скандинавский бог Один прибудут в таинственный Дом на Скале. В этом месте соберутся все старые божества, которые объединятся для войны с новыми богами человечества во главе с загадочным Мистером Миром.",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                }, {
                    "key": "6t0g",
                    "text": "Ранее телеканал Starz опубликовал дебютный тизер второго сезона \"Американских богов\". Сколько эпизодов получит продолжение, пока неизвестно.",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [{
                        "offset": 34,
                        "length": 14,
                        "key": 0
                    }],
                    "data": {}
                }, {
                    "key": "3tk8j",
                    "text": "",
                    "type": "atomic",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {
                        "src": "https://cdn.depa.io/images/jpeg/680x1020/305921_eKjl4yeKoo_ag.jpg",
                        "type": "image"
                    }
                }, {
                    "key": "4us17",
                    "text": "",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                }],
                "entityMap": {
                    "0": {
                        "type": "LINK",
                        "mutability": "MUTABLE",
                        "data": {
                            "url": "https://shazoo.ru/2018/10/06/71032/pervyj-tizer-vtorogo-sezona-amerikanskih-bogov",
                            "href": "https://shazoo.ru/2018/10/06/71032/pervyj-tizer-vtorogo-sezona-amerikanskih-bogov"
                        }
                    }
                }
            })
        };
        return _this;
    }

    return Editor;
}(_react.Component);

var Creator = function (_Component2) {
    _inherits(Creator, _Component2);

    function Creator(props) {
        _classCallCheck(this, Creator);

        var _this2 = _possibleConstructorReturn(this, (Creator.__proto__ || Object.getPrototypeOf(Creator)).call(this, props));

        _this2.handleTab = function (e) {
            switch (e.currentTarget.getAttribute('id')) {
                case 'editor':
                    _this2.setState({ isEditor: true });
                    break;
                case 'html':
                    _this2.setState({ isEditor: false });
                    break;
                default:
                    break;
            }
        };

        _this2.toggleReadOnly = function () {
            return _this2.setState({ readOnly: !_this2.state.readOnly });
        };

        _this2.state = {
            isEditor: true,
            readOnly: true
        };
        return _this2;
    }

    _createClass(Creator, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "column" },
                _react2.default.createElement(
                    "section",
                    { id: "toggle", style: { marginBottom: 16 } },
                    _react2.default.createElement(
                        "button",
                        { className: "button is-success is-pulled-right", onClick: this.toggleReadOnly },
                        "Toggle"
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { id: "header" },
                    _react2.default.createElement(
                        "h4",
                        null,
                        "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "control" },
                        _react2.default.createElement("input", { className: "input", type: "text", placeholder: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" })
                    )
                ),
                _react2.default.createElement(
                    "section",
                    { id: "body" },
                    _react2.default.createElement(
                        "div",
                        { className: "tabs is-right" },
                        _react2.default.createElement(
                            "ul",
                            null,
                            _react2.default.createElement(
                                "li",
                                { className: this.state.isEditor ? 'is-active' : null },
                                _react2.default.createElement(
                                    "a",
                                    { id: "editor", onClick: this.handleTab },
                                    _react2.default.createElement(
                                        "span",
                                        { className: "icon" },
                                        _react2.default.createElement("i", { className: "fas fa-pencil-alt" })
                                    ),
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440"
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                "li",
                                { className: !this.state.isEditor ? 'is-active' : null },
                                _react2.default.createElement(
                                    "a",
                                    { id: "html", onClick: this.handleTab },
                                    _react2.default.createElement(
                                        "span",
                                        { className: "icon" },
                                        _react2.default.createElement("i", { className: "fas fa-code" })
                                    ),
                                    _react2.default.createElement(
                                        "span",
                                        null,
                                        "HTML"
                                    )
                                )
                            )
                        )
                    ),
                    this.state.isEditor ? _react2.default.createElement(Editor, { readOnly: this.state.readOnly }) : _react2.default.createElement("textarea", { className: "textarea", placeholder: "\u0422\u0435\u043A\u0441\u0442..." })
                )
            );
        }
    }]);

    return Creator;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(
    "div",
    { className: "wrapper" },
    _react2.default.createElement(
        "nav",
        { className: "navbar has-shadow is-fixed-top-desktop" },
        _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
                "div",
                { className: "navbar-brand" },
                _react2.default.createElement(
                    "div",
                    { className: "navbar-item" },
                    _react2.default.createElement(
                        "div",
                        null,
                        "Vortex"
                    )
                )
            )
        )
    ),
    _react2.default.createElement(
        "div",
        { className: "app-container" },
        _react2.default.createElement(
            "div",
            { className: "content" },
            _react2.default.createElement(Creator, null)
        )
    )
), document.getElementById('app'));