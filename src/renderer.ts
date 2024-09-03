

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Slideshow from './components/Slideshow';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(React.createElement(Slideshow));

console.log('👋 Renderer process is running');
