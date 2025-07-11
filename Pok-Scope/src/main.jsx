import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; 
import App from './App.jsx';
import { GlobalStyles } from "./utils/Styles.js";

// Inject global styles if not already injected
if (!document.getElementById('global-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'global-styles';
  styleElement.innerHTML = GlobalStyles;  // GlobalStyles must be a CSS string
  document.head.appendChild(styleElement);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
