import * as ReactDOMClient from 'react-dom/client'
import TimeTableBody from "./App.js"

const body = ReactDOMClient.createRoot(document.querySelector('body'))
body.render(<TimeTableBody/>)