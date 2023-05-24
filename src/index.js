import * as ReactDOMClient from 'react-dom/client'
import Main from "./App.js"

const body = ReactDOMClient.createRoot(document.getElementById('root'))
body.render(<Main/>)