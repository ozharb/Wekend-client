import React from 'react';
import ReactDOM from 'react-dom';
import DayPage from './DayPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DayPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});