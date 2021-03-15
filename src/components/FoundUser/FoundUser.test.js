import React from 'react';
import FoundUser from './FoundUser';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders the UI as expected', () => {
  const tree = renderer
    
    .create(
    <BrowserRouter>
    <FoundUser 
    props={{user:{username:''}}} user={{username:''}}
    />
     </BrowserRouter>
    )

    
    .toJSON();
 
  expect(tree).toMatchSnapshot();  
  });