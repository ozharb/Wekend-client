import React from 'react';
import ReactDOM from 'react-dom';
import FriendsPage from './FriendsPage';
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
  <FriendsPage />
  </BrowserRouter>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});