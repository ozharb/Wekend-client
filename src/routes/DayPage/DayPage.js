import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import DayEvent from '../../components/DayEvent/DayEvent'
import './DayPage.css'

export default class DayPage extends Component {
    static contextType = EventsContext
    static defaultProps = {
        match: { params: {} },
      }
    componentDidMount() {
         
        this.context.clearError()
        WekendApiService.getEvents()
            .then(this.context.setEvents)
            .catch(this.context.setError)
    }

    renderEvents() {
        const { events = [] } = this.context
       const {day} = this.props.match.params
     console.log('day:', day)   
        let dayEvents = events.filter(event=> 
            event.day === day)
            dayEvents = dayEvents.sort((a,b)=> parseInt(a.time)-parseInt(b.time))
            console.log("dayevents:", dayEvents)
        return dayEvents.map(event =>
          <DayEvent
            key={event.id}
            event={event}
          />
        )
      }

    render() {
        const { error } = this.context
        const {day} = this.props.match.params
        return (
            <section className='DayPage'>
                <h2>{day}</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderEvents()}
            
            </section>
        )
    }
}
