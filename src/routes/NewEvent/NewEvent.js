import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import { Input, Required } from '../../Utils/Utils'
import AppForm from '../../Utils/AppForm'
import './NewEvent.css'

export default class NewEvent extends Component {
  state = {
    title: { value: '', touched: false },
    time: { value: '', touched: false },
    sumbmitted: false,
};
setTitle = title => {
    this.setState({ title: { value: title, touched: true } }); // Switch touched to true
};
setTime = time => {
  this.setState({ time: { value: time, touched: true } }); // Switch touched to true
};
validateTitle = () => {
    let title = this.state.title.value;

    if (title.length <= 0) {

        return "What's the event?";
    }
}
validateTime = () => {
  let time = this.state.time.value;

  if (time.length <= 0) {

      return "What time's this happening?";
  }
}
  static contextType = EventsContext

  handleSubmit = e => {
    e.preventDefault()

    const  title = e.target['title'].value
    const time = e.target['time'].value || `12:00 pm`
    const place = e.target['place'].value
    const details = e.target['details'].value
    const day = e.target['day'].value

    WekendApiService.postEvent(title, time, place, details, day)
  
      .then((event) => {
        
        let username = 'user'
        const user =  window.localStorage.getItem(username)  
        this.context.addEvent(event, user)
        this.setState({sumbmitted: true})
        setTimeout(() => {
          this.props.history.push('/days')
       }, 2000); 
        
      })
      .catch(this.context.setError)
  }

  render() {
    return (
      <section className='add-event-form'>

                {this.state.sumbmitted ? <h3 className ='posted-event'>Posted!</h3>:
                <>
                                <legend><h3>Add Event</h3></legend>
                                <fieldset>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='Event-title-input'>
                        Title <Required />

                        {<p className="error">{this.validateTitle()}</p>}
                    </label>
                    <Input type='text' id='event-title-input' name='title'
                        value={this.state.title.value}
                        onChange={e => this.setTitle(e.target.value)} />
                    <label htmlFor='event-form-content'>
                        Additional Info:
            </label>
                    <Input id='item-form-content' name="details" />

                    <label htmlFor='item-form-time'>
                        Time:
            </label>
                    <Input id='item-form-time' type='time' name="time"
                     value={this.state.time.value}
                     onChange={e => this.setTime(e.target.value)}
                     />
                    <label htmlFor='event-form-place'>
                        Place:
            </label>
                    <Input id='item-form-quantity' type='text' name="place"/>
                    <label htmlFor='event-form-day'>
                        Day:
            </label>
            <select
            required
            aria-label='Pick day!'
            name='day'
            id='day'
          >
            <option value='Friday'>Friday</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>

          </select>
                    <button className='done-add-event' type="submit" disabled={this.validateTitle()}>Post</button>

                </form>
                </fieldset>
                </>
  }
            </section>
    )
  }
}
