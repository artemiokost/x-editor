"use strict";

var _draftJs = require("draft-js");

var _draftJs2 = _interopRequireDefault(_draftJs);

var _insertDataBlock = require("./insertDataBlock");

var _insertDataBlock2 = _interopRequireDefault(_insertDataBlock);

var _VortexEditor = require("./components/VortexEditor");

var _VortexEditor2 = _interopRequireDefault(_VortexEditor);

var _Sidebar = require("./components/Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Toolbar = require("./components/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = {
    DraftJS: _draftJs2.default,
    VortexEditor: _VortexEditor2.default,
    Sidebar: _Sidebar2.default,
    Toolbar: _Toolbar2.default,
    editorStateFromRaw: utils.editorStateFromRaw,
    editorStateToJSON: utils.editorStateToJSON,
    createTypeStrategy: utils.createTypeStrategy,
    insertDataBlock: _insertDataBlock2.default
};

module.exports = Editor;