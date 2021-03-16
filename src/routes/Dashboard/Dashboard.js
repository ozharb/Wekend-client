import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import EventsContext from '../../contexts/EventsContext'
// import WekendApiService from '../../services/Wekend-api-service'
// import ThingListItem from '../../components/ThingListItem/ThingListItem'
import './Dashboard.css'

export default class Dashboard extends Component {
 

    renderDayLinks() {

        return <>
            <Link
                to='/days/Friday'
            >
                Friday
          </Link>
            <Link
                to='/days/Saturday'
            >
                Saturday
          </Link>
          <Link
                to='/days/Sunday'
            >
                Sunday
          </Link>
        </>
    }

    render() {
        const { error } = this.context
        return (
            <section  className='Dashboard'>
                <h3>DayBoard</h3>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderDayLinks()}
            </section>
        )
    }
}
