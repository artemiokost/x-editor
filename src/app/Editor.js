import DraftJS from 'draft-js'

import insertDataBlock from './insertDataBlock'
import XEditor from './components/XEditor'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import * as utils from './utils'

const Editor = {
  DraftJS,
  VortexEditor: XEditor,
  Sidebar,
  Toolbar,
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateToJSON: utils.editorStateToJSON,
  createTypeStrategy: utils.createTypeStrategy,
  insertDataBlock,
}

module.exports = Editor