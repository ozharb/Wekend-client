import React from 'react';
import RequestReceived from './RequestReceived';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders the UI as expected', () => {
  const tree = renderer
    
    .create(
    <BrowserRouter>
    <RequestReceived 
    props={{friend:{friend:''}}} friend={{friend:''}}
    />
     </BrowserRouter>
    )

    
    .toJSON();
 
  expect(tree).toMatchSnapshot();  
  });