import React from 'react';
import ReactDOM from 'react-dom';
import NewFriend from './NewFriend';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewFriend />, div);
  ReactDOM.unmountComponentAtNode(div);
});