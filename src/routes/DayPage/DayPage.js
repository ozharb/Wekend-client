import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import DayEvent from '../../components/DayEvent/DayEvent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './DayPage.css'

export default class DayPage extends Component {
    state = {
        loading: true
    }
setLoading = (trueOrFalse) =>{
    this.setState({loading: trueOrFalse})
}
    static contextType = EventsContext
    static defaultProps = {
        match: { params: {} },
      }

    componentDidMount() {
     
        this.context.clearError()
        WekendApiService.getEvents()
            .then(this.context.setEvents )
            .then(()=>this.setLoading(false))
            .catch(this.context.setError)
    }
    renderEvents() {
    
        const { events = [] } = this.context
 
       const {day} = this.props.match.params

        let dayEvents = events.filter(event=> 
            event.day === day)
            dayEvents = dayEvents.sort((a,b)=> parseInt(a.time)-parseInt(b.time))

        return  dayEvents.map(event =>
          <DayEvent
            key={event.id}
            event={event}
            loading = {this.state.loading}
          />
        )
      }
  

    render() {

        const { error } = this.context
        const {day} = this.props.match.params
        const { events = [] } = this.context
       
        let dayEvents = events.filter(event=> 
            event.day === day)
           const noEvents =  dayEvents.length
           ? null
            :<h3>You have no events for this day...
           <br/>
           <Link to = '/new-event' className='add-one-now'>add one now</Link></h3>
       
        return  (

            <section className='DayPage'>
                <h2>{day}</h2>
                {this.state.loading
                ?     <div className='loader-container'>
                <div className='Loader'>
                <div className="loader-circle-overlay"  > 
                <i className="fas fa-moon small-moon"><FontAwesomeIcon className='small-moon' icon='moon' /></i>
                </div>
                    </div>
                    </div>
            : noEvents} 
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : !this.state.loading && this.renderEvents()}
                
            </section>
        )
      
    }
}
