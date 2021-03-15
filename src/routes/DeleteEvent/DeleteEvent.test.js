import React from 'react';
import ReactDOM from 'react-dom';
import DeleteEvent from './DeleteEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteEvent props={{location: {state: {title:''}}}} location={{state:{title:''}}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});