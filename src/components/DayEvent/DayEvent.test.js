import React from 'react';
import DayEvent from './DayEvent';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

it('renders the UI as expected', () => {
  const tree = renderer
    
    .create(
    <BrowserRouter>
    <DayEvent 
    props={{event:{attendees:[{username:''}], title:'', time: '0:00'}}}
    event={{attendees:[{username:''}], title:'', time:'0:00'}}
    time={'0:00'}
    />
     </BrowserRouter>
    )

    
    .toJSON();
 
  expect(tree).toMatchSnapshot();  
  });