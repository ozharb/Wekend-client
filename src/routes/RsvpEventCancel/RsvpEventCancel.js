import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import './RsvpEventCancel.css'

export default class RsvpEventCancel extends Component {
  state = {

    submitted: false,
};
 static contextType = EventsContext

handleCancel = e =>{
  e.preventDefault()
  this.props.history.goBack()
}
  handleSubmit = e => {
    e.preventDefault()
    WekendApiService.deleteAttendance(this.props.match.params.event_id)
      .then(() => {
        let username = 'user'
          const user =  window.localStorage.getItem(username)  
        this.context.deleteAttendance(this.props.match.params.event_id,  user)
        this.setState({submitted: true})
        setTimeout(() => {
          this.props.history.goBack()
       }, 2000); 
      })
      .catch(this.context.setError)
  }
  
  render() {
    const { title } = this.props.location.state

    return (
      <section className='add-event-form'>
           
                {this.state.submitted ? <h3 className ='posted-event-cancel'>You're <br/>not<br/> going</h3>:
                <>
                      <h3>RSVP</h3>
                <form onSubmit={this.handleSubmit}
                onCancel = {this.handleCancel}>
                    <label htmlFor='event-form-day'>
                    Not going to {title}?
            </label>
          <br/>
  
                    <button className='done-add-event' type="submit">Not going</button>
                    <button className='done-add-event cancel' onClick = {this.handleCancel} type='cancel'>Still going</button>
                </form>
                </>
  }
            </section>
    )
  }
}
