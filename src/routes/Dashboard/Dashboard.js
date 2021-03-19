import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    handleScroll = () => {
        if(this.props.scrollToTarget){
            this.props.scrollToTarget()
        }
    }
    render() {
        const { error } = this.context
        return (
            <>
            <section  className='Dashboard'>
                <h3 className='dayboard-header'>DayBoard</h3>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderDayLinks()}
                    
            </section>
             <div className='help-link-container' >
          <Link className='help-link' to={{                             
    pathname: '/',                    
      state: {                        
        fromDashboard: true                    
      }                
    }} >
            help me</Link>
        </div>    
        </>
        )
    }
}
