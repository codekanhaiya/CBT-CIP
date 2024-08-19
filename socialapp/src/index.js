import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="d-flex justify-content-around align-items-center">
        <div className="card border-0 shadow-lg bg-body-tertiary rounded" style={{ width: 'max-content' }}>
          <h2 className="lg border-bottom border-primary border-2 p-2">CONNECTSPHERE</h2>
        </div>
      </div>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
