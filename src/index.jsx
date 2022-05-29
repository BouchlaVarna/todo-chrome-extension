/* global chrome  */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Todo from './Todo/Todo';
import './main.scss';

const App = () => {
  return (
    <Todo />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);