import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import { Input, Required } from '../../Utils/Utils'
import './EditEvent.css'

export default class EditEvent extends Component {
  state = {
    id : '',
    title: { value: '', touched: false },
    time: { value: '', touched: false },
    place: '',
    details: '',
    day: '',

    sumbmitted: false,
};
setTitle = title => {
    this.setState({ title: { value: title, touched: true } }); // Switch touched to true
};
setTime = time => {
  this.setState({ time: { value: time, touched: true } }); // Switch touched to true
};
setDay = day => {
  this.setState({ day: day}); 
};
componentDidMount() {
          
  this.context.clearError()
  WekendApiService.getEvent(this.props.match.params.event_id)
  .then(data => {
    this.setState({
        id: data.id,
        title: { value: data.title, touched: false },
        time: { value: data.time, touched: false },
        place: data.place,
        day: data.day,
        details: data.details,
    })
})
.catch(error => { console.error({ error }) })

}


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
handleCancel = e =>{
  e.preventDefault()
  this.props.history.goBack()
}
  handleSubmit = e => {
    e.preventDefault()
const fieldsToUpdate = {
  id: this.props.match.params.event_id,
   title:  this.state.title.value,
   time: this.state.time.value || "12:00 pm",
    place: e.target['place'].value,
     details: e.target['details'].value,
    day :e.target['day'].value,
}
   

 
    WekendApiService.changeEvent(fieldsToUpdate)
  
      .then((event) => {
        this.setState({sumbmitted: true})
        setTimeout(() => {
          this.props.history.goBack()
       }, 2000); 
        
      })
      .catch(this.context.setError)
  }
  
  render() {
 

    return (
      <section className='add-event-form'>
           
                {this.state.sumbmitted ? <h3 className ='posted-event'>Updated!</h3>:
                   
                <form onSubmit={this.handleSubmit}
                onCancel = {this.handleCancel}>
                    <h3>Add Event</h3>
                    <label htmlFor='Event-title-input'>
                        Title <Required />

                        {<p className="error">{this.validateTitle()}</p>}
                    </label>
                    <Input type='text' id='event-title-input' name='title'
                        value={this.state.title.value}
                        onChange={e => this.setTitle(e.target.value)}
                        />
                    <label htmlFor='event-form-content'>
                        Additional Info:
            </label>
                    <Input id='item-form-content'
                     name="details" 
                     defaultValue={this.state.details}/>

                    <label htmlFor='item-form-time'>
                        Time:
            </label>
                    <Input id='item-form-time'
                     type='time'
                      name="time"
                     value={this.state.time.value}
                     onChange={e => this.setTime(e.target.value)}
                    
                     />
                    <label htmlFor='event-form-place'>
                        Place:
            </label>
                    <Input id='event-form-place'
                     type='text' 
                    name="place"
                    defaultValue={this.state.place}
                    />
                    <label htmlFor='event-form-day'>
                        Day:
            </label>
          
            <select
            required
            aria-label='Pick day!'
            name='day'
            id='day'
            value={this.state.day}
            onChange={e => this.setDay(e.target.value)}
          >
            <option value='Friday'>Friday</option>
            <option value='Saturday'>Saturday</option>
            <option value='Sunday'>Sunday</option>

          </select>
                    <button className='done-add-event' type="submit"
                     disabled={(this.validateTitle())||(this.validateTime())}>Post</button>
                    <button className='done-add-event cancel' onClick = {this.handleCancel} type='cancel'>Nevermind</button>
                </form>
  }
            </section>
    )
  }
}
