import React from 'react';
import EditEvent from './EditEvent';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'
it('renders the UI as expected', () => {
  const tree = renderer
    
    .create(
    <BrowserRouter>
    <EditEvent props={{match: {params: {event_id:''}}}} match={{params:{event_id:''}}}/>
     </BrowserRouter>
    )

    
    .toJSON();
 
  expect(tree).toMatchSnapshot();  
  });