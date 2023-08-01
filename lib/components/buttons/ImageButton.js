"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

var _insertDataBlock = require("../../insertDataBlock");

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageButton = function (_Component) {
    _inherits(ImageButton, _Component);

    function ImageButton() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ImageButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageButton.__proto__ || Object.getPrototypeOf(ImageButton)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (e) {
            e.preventDefault();
            var src = window.prompt(_this.props.i18n["Enter a URL"]);
            if (!src) {
                return;
            }
            var data = { src: src, type: _constants.MEDIA_TYPE_IMAGE };
            _this.props.onChange((0, _insertDataBlock2.default)(_this.props.editorState, data));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ImageButton, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "button",
                {
                    className: this.props.className,
                    type: "button",
                    onClick: this.onClick,
                    title: this.props.title },
                _react2.default.createElement(_icons2.default.ImageIcon, { className: "sidemenu__button__icon" })
            );
        }
    }]);

    return ImageButton;
}(_react.Component);

exports.default = ImageButton;