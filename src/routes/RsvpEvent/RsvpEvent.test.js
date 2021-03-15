import React from 'react';
import ReactDOM from 'react-dom';
import RsvpEvent from './RsvpEvent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RsvpEvent props={{location: {state: {title:''}}}} location={{state:{title:''}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});