import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WekendApiService from '../../services/Wekend-api-service'

import './DayEvent.css'
import EventsContext from '../../contexts/EventsContext';


const convertTime = require('convert-time');
export default class DayEvent extends Component {
    static contextType = EventsContext
    state = {
        expand: false,
        error: null,
        alert: false
    };
    handleExpand = e => {
        this.setState({
            expand: !this.state.expand
        })
    }
    
    
    render() {  
               const { event } = this.props
              
        let username = 'user'
        const user =  window.localStorage.getItem(username)
        const attending = (event.attendees.length)
        ? (!!event.attendees.find(i=>i.username===user))
        : false
    
        
        const rsvpLink = (attending)?`cancel-rsvp`:`rsvp`
        const path = `/${rsvpLink}/${event.id}`
         let alertStyle = event.alert ? {color: 'red'} : null
        let headingStyle = (event.title.length > 12 && this.state.expand)? 'Day-Events_heading-small' : 'Day-Events_heading-large'
        let time = convertTime(event.time)
        let timeNumbers = time.split('').slice(0, time.length - 2).join('')
        let timeLetters = time.split('').slice(time.length - 2).join('')
        
        const notify = () => toast((t) => (
            <span className = 'alert-message'>
               <b>{event.Event_Host===user?`You`: event.Event_Host}</b>
        {'  '}changed this event.
        <br/>
              <button onClick={() => toast.dismiss(t.id)}>
                Cool
              </button>
            </span>
       
          ) 
              ,WekendApiService.turnOffAlert(event.id)
         
            .then(this.context.changeEventAlert(event.id,user))
              .catch(error => { console.error({ error }) })
            
          );
         const host = event.Event_Host ===user ? <>
           <span className='host-name'>You're</span> hosting
         </> 
         : <>
         <span className='host-name'>{event.Event_Host}'s</span> hosting
       </> 
       
        const eventDetails = this.state.expand

            ?<div className = 'Event-top-and-bottom'>
             <div className='Event-content-details'>
                <div className="Event-column-1">
                  {host} <br/>
                  @ {event.place}
                </div>
                <div className="Event-column-2">
                    {timeNumbers}
                    <div className='time-letters'>{timeLetters}</div>
                </div>
            </div>
            <div className = 'event-details'>
    <div className='Event-bottom-row'> 
   <span className = 'deets'> deets:</span>{event.details.length===0? 'No deets':event.details.split(/\n \r|\n/).map((para, i) =>
                    <p key={i}>{para}</p>)}
          </div>          
    {event.Event_Host === user 
     ?<div className='Event-edit-container'>
                                 <Link
                        to={`/change-event/${event.id}`}
                        className='Event-edit-link'>
                        edit
                     </Link>
                     <Link
                        to={{pathname:`/delete-event/${event.id}`,
                            state:{ title: event.title  }
                        }}
                        className='Event-edit-link'>
                        delete
                     </Link>
                        </div>
                     : <div className='Event-edit-container'>
                     <Link
            to={{pathname: path,
            state: {
                title: event.title
            }}}
            className='Event-edit-link'>
            {attending?`change rsvp`: `rsvp`}
         </Link>
            </div>}
                </div>
               
                </div>
            : null
            
       const alertOrExpand = event.alert? notify : this.handleExpand

        return (
            <>
                <div className='Day-Events'>
          
     
      <Toaster position="top-center"/>

                    <button
                        type='button'
                        aria-label='expand'
                        onClick={alertOrExpand}
                        className='Event__expand-event-button'>
                        <div className="Event-Content">
                            <div className='event-title-attendees'>
                                <h2 className={headingStyle} style={alertStyle}>{event.title}</h2>
                                {this.state.expand && 
                                <>
                                <span className='whos-going'>Who's going:</span> 
                                <ul className = 'events-attendees'>
                                    
                                   
                                   { event.attendees.length === 0? <p>Nobody</p>:event.attendees.map((el,i)=>{
                                   return <li key={i+event.id} className={el.alert?'alert-on':'alert-off'}>{el.username}</li>
                                })}
                                </ul> 
                                </>}
                                
                                {/* <h2 className='Day-Events_heading'>{event.time}</h2> */}
                            </div>
                   
                            {eventDetails}

                        </div>
                    </button>
                </div>
    
            </>
        )
    }
}

