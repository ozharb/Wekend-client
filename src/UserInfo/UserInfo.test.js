import React from 'react';
import UserInfo from './UserInfo';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders the UI as expected', () => {
  const tree = renderer
  
    .create(
      <BrowserRouter>  
    <UserInfo  />
    </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();  
  });