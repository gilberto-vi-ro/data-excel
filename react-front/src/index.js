import React from 'react';
import ReactDOM from 'react-dom/client';
////import './css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './components/serviceWorker.js';
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();


