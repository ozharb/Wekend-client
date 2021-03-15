import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import { Input, Required } from '../../Utils/Utils'
import './DeleteEvent.css'

export default class DeleteEvent extends Component {
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
    WekendApiService.deleteEvent(this.props.match.params.event_id)
      .then(() => {
        this.context.deleteEvent(this.props.match.params.event_id)
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
           
                {this.state.submitted ? <h3 className ='posted-event'>deleted</h3>:
                <>
                      <h3>Delete</h3>
                <form onSubmit={this.handleSubmit}
                onCancel = {this.handleCancel}>
                    <label htmlFor='event-form-day'>
                    Delete '{title}'?
            </label>
          <br/>
  
                    <button className='done-add-event' type="submit">yes</button>
                    <button className='done-add-event cancel' onClick = {this.handleCancel} type='cancel'>no</button>
                </form>
                </>
  }
            </section>
    )
  }
}
