import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalStyles } from "./utils/Styles.js";
// Inject global styles
const styleElement = document.createElement('style');
styleElement.innerHTML = GlobalStyles;
document.head.appendChild(styleElement);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
