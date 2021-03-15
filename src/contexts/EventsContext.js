import React, { Component } from 'react'


const EventsContext = React.createContext({
  events: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setEvents: () => {},
  changeEvent: () => {},
  deleteEvent: () => {},
  addEvent: () => {},
  findEvent: () => {},
  changeEventAlert: ()=> {},
  postAttendance: () => {},
  deleteAttendance: ()=>{}
})

export default EventsContext

export class EventsProvider extends Component {
  state = {
    events: [],
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setEvents = events => {
    this.setState({ events })
  }

  changeEvent = event => {
    this.setState({
        events: this.state.events.map(i =>
          (i.id !== event.id) ? i : {...i,event}
        )
      })
  }
 postAttendance = (eventId, username) => {
     this.setState({
         events: this.state.events.map(i=>
(i.id!==eventId) ? i : {...i,attendees: [...{username: username, alert: false}]}
         )
     })
 }
 deleteAttendance = (eventId, username) => {
    this.setState({
        events: this.state.events.map(i=>
(i.id!==eventId) 
? i
: {...i,attendees: [i.attendees.filter(person=>person.username !==username)]}
        )
    })
}
  changeEventAlert = eventId => {
    
    this.setState({
        events: this.state.events.map(i =>
          (i.id !== eventId) ? i : {...i, alert:false}
        )
      })
  }

deleteEvent = eventId => {
    this.setState({
      events: this.state.events.filter(event =>
        event.id !== parseInt(eventId))
    })
  }
addEvent = (event, username) => {
    this.setState({
      events: [
        ...this.state.events,
        event['attendees'] = {username:username, alert:false}
      ]
    })
  }
  findEvent = eventId => {

      return this.state.events.find(ev=>ev.id===parseInt(eventId))
  }

  render() {
    const value = {
      events: this.state.events,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setEvents: this.setEvents,
      changeEvent: this.changeEvent,
      deleteEvent: this.deleteEvent,
      addEvent: this.addEvent,
      findEvent: this.findEvent,
      changeEventAlert: this.changeEventAlert,
      postAttendance: this.postAttendance,
      deleteAttendance: this.deleteAttendance
    }
    return (
      <EventsContext.Provider value={value}>
        {this.props.children}
      </EventsContext.Provider>
    )
  }
}
