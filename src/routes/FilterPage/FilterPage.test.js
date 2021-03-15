import React from 'react';
import ReactDOM from 'react-dom';
import FilterPage from './FilterPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});