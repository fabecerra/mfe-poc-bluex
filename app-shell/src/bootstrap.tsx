import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';

import RemoteApp from './interfaces/remoteApp';
import App from "./shell/AppShell";

// const components = [
//   { name: 'header', type: 'header' },
//   { name: 'footer', type: 'footer' },
//   { name: 'navbar', type: 'navbar' },
//   { name: 'content', type: 'content' },
//   { name: 'tool', type: 'tool' },
//   { name: 'not-found', type: 'not-found' },
// ];

const components = [
  'header', 'footer', 'navbar', 'content', 'tool', 'not-found', 'no-existe'
];

const apps: RemoteApp[] = [
  { scope: 'app1', module: './Content', url: 'http://localhost:7001/remoteEntry.js' },
  { scope: 'app2', module: './Content', url: 'http://localhost:7002/remoteEntry.js' }
];

ReactDOM.render(<React.StrictMode><App apps={apps} components={components} /></React.StrictMode>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
