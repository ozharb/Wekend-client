import React from 'react';
import ReactDOM from 'react-dom';
import RsvpEventCancel from './RsvpEventCancel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RsvpEventCancel props={{location: {state: {title:''}}}} location={{state:{title:''}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});