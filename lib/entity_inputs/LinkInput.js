"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("../icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkInput = function (_Component) {
    _inherits(LinkInput, _Component);

    function LinkInput(props) {
        _classCallCheck(this, LinkInput);

        var _this = _possibleConstructorReturn(this, (LinkInput.__proto__ || Object.getPrototypeOf(LinkInput)).call(this, props));

        _this.onLinkChange = function (event) {
            event.stopPropagation();
            var url = event.target.value;
            if (url === "") {
                _this.props.cancelError();
            }
            _this.setState({ url: url });
        };

        _this.onLinkKeyDown = function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                _this.setLink(event);
            } else if (event.key === "Escape") {
                event.preventDefault();
                _this.reset();
            }
        };

        _this.state = {
            url: props && props.url || ""
        };
        return _this;
    }

    _createClass(LinkInput, [{
        key: "setLink",
        value: function setLink(event) {
            var url = this.state.url;

            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "http://" + url;
            }

            var expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9]+-?)*[a-z0-9]+)(?:\.(?:[a-z0-9]+-?)*[a-z0-9]+)*(?:\.(?:[a-z]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/gi;
            var regex = new RegExp(expression);
            var i18n = this.props.i18n;


            if (!url.match(regex)) {
                var errorMsg = i18n["Invalid link"];

                this.props.setError(errorMsg);
                this.textInput.focus();
                return;
            }

            this.props.setEntity({ url: url });

            this.reset();

            // Force blur to work around Firefox's NS_ERROR_FAILURE
            event.target.blur();
        }
    }, {
        key: "reset",
        value: function reset() {
            this.setState({
                url: ""
            });

            this.props.cancelEntity();
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.textInput.focus();
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var i18n = this.props.i18n;

            var msg = i18n["Type the link and press enter"];

            return _react2.default.createElement(
                "div",
                { style: { whiteSpace: "nowrap" } },
                _react2.default.createElement("input", {
                    ref: function ref(el) {
                        _this2.textInput = el;
                    },
                    type: "text",
                    className: "toolbar__input",
                    onChange: this.onLinkChange,
                    value: this.state.url,
                    onKeyDown: this.onLinkKeyDown,
                    placeholder: msg
                }),
                _react2.default.createElement(
                    "span",
                    { className: "toolbar__item", style: { verticalAlign: "bottom" } },
                    _react2.default.createElement(
                        "button",
                        {
                            onClick: this.props.removeEntity,
                            type: "button",
                            className: "toolbar__button toolbar__input-button" },
                        this.props.entity ? _react2.default.createElement(_icons2.default.UnlinkIcon, null) : _react2.default.createElement(_icons2.default.CloseIcon, null)
                    )
                )
            );
        }
    }]);

    return LinkInput;
}(_react.Component);

exports.default = LinkInput;