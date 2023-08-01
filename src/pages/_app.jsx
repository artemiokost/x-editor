import React from 'react'
import '../../public/css/illumi.css'
import '../../public/css/x-editor.css'

const App = ({ Component, pageProps, ...rest }) => {
  return <Component {...pageProps} />
}

export default App
