"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;
exports.createTypeStrategy = createTypeStrategy;

var _draftJs = require("draft-js");

var _defaultDecorator = require("./decorators/defaultDecorator");

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function editorStateToJSON(editorState) {
    if (editorState) {
        var content = editorState.getCurrentContent();
        return JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2);
    }
}

function editorStateFromRaw(rawContent) {
    var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

    if (rawContent) {
        var content = (0, _draftJs.convertFromRaw)(rawContent);
        return _draftJs.EditorState.createWithContent(content, decorator);
    } else {
        return _draftJs.EditorState.createEmpty(decorator);
    }
}

function getSelectedBlockElement(range) {
    var node = range.startContainer;
    do {
        try {
            var nodeIsDataBlock = node.getAttribute ? node.getAttribute("data-block") : null;
            if (nodeIsDataBlock) {
                return node;
            }
            node = node.parentNode;
        } catch (error) {
            return null;
        }
    } while (node !== null);
    return null;
}

function getSelectionCoords(editor, toolbar) {
    var editorBounds = editor.getBoundingClientRect();
    var win = editor.ownerDocument.defaultView || window;
    var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(win);
    if (!rangeBounds || !toolbar) {
        return null;
    }
    var toolbarHeight = toolbar.offsetHeight;
    var toolbarWidth = toolbar.offsetWidth;

    var minOffsetLeft = 5;
    var minOffsetRight = 5;
    var minOffsetTop = 5;

    var rangeWidth = rangeBounds.right - rangeBounds.left;
    var arrowStyle = {};

    var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
    arrowStyle.left = "50%";
    if (offsetLeft - toolbarWidth / 2 + editorBounds.left < minOffsetLeft) {
        offsetLeft = toolbarWidth / 2 - editorBounds.left + minOffsetLeft;
        arrowStyle.left = (rangeBounds.left + rangeBounds.right) / 2 - minOffsetLeft;
    }
    if (offsetLeft + toolbarWidth / 2 + editorBounds.left > win.innerWidth - minOffsetRight) {
        arrowStyle.left = rangeBounds.left - (win.innerWidth - minOffsetRight - toolbarWidth) + (rangeBounds.right - rangeBounds.left) / 2;
        offsetLeft = win.innerWidth - editorBounds.left - toolbarWidth / 2 - minOffsetRight;
    }
    var offsetTop = rangeBounds.top - editorBounds.top - 14;
    arrowStyle.top = "100%";
    if (offsetTop - minOffsetTop - toolbarHeight + editorBounds.top < 0) {
        //Always make sure that, if the range bounds does not fully exists, we keep the current coordinates
        if (rangeBounds.bottom && !Number.isNaN(rangeBounds.bottom)) {
            offsetTop = rangeBounds.bottom - editorBounds.top + toolbarHeight + 14;
            arrowStyle.top = "-14px";
            arrowStyle.transform = "rotate(180deg)";
        }
    }

    return { offsetLeft: offsetLeft, offsetTop: offsetTop, arrowStyle: arrowStyle };
}

function createTypeStrategy(type) {
    return function (contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(function (character) {
            var entityKey = character.getEntity();
            return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
        }, callback);
    };
}