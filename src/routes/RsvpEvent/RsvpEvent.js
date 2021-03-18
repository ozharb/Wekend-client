import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import './RsvpEvent.css'

export default class RsvpEvent extends Component {
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
    WekendApiService.postAttendance(this.props.match.params.event_id)
      .then(() => {
        let username = 'user'
          const user =  window.localStorage.getItem(username)  
        this.context.postAttendance(this.props.match.params.event_id,  user)
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
                {this.state.submitted ? <h3 className ='posted-event'>You're Going!</h3>:
                <>
                      <h3>RSVP</h3>
                <form onSubmit={this.handleSubmit}
                onCancel = {this.handleCancel}>
                    <label htmlFor='event-form-day'>
                    Going to {title}?
            </label>
          <br/>
                    <button className='done-add-event' type="submit">Yes</button>
                    <button className='done-add-event cancel' onClick = {this.handleCancel} type='cancel'>No</button>
                </form>
                </>
  }
            </section>
    )
  }
}
