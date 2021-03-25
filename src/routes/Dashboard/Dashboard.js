import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import './Dashboard.css'

export default class Dashboard extends Component {


    renderDayColumnLinks() {

        return <article className='days-links'>
            <div className='dayboard-container dayboard-friday'>
                <Link
                    to='/days/Friday'
                >
                    Friday
          </Link>
            </div>
            <div className='dayboard-container dayboard-saturday'>
                <Link
                    to='/days/Saturday'
                >
                    Saturday
          </Link>
            </div>
            <div className='dayboard-container dayboard-sunday'>
                <Link
                    to='/days/Sunday'
                >
                    Sunday
          </Link>
            </div>
        </article>
    }
    renderDayCircleLinks() {

        return <article className='days-links-circle'>
                       <svg viewBox="0 0 500 200">

<path 
fill='transparent'
id="curve"
 d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"/>

<text width="500" className='circle-text'>
<textPath xlinkHref='#curve' >
          
                <Link
                    to='/days/Friday'
                >
                    Friday
          </Link>
        {' '}
                <Link
                    to='/days/Saturday'
                >
                    Saturday

          </Link>
          {' '}
                <Link
                    to='/days/Sunday'
                >
                    Sunday
          </Link>
         
            </textPath>
    </text>
</svg>
        </article>
    }
    handleScroll = () => {
        if (this.props.scrollToTarget) {
            this.props.scrollToTarget()
        }
    }
  
      
    render() {

        const { error } = this.context
      
        return (
            <div>
                <section className='Dashboard'>
                    <h2 className='dayboard-header'>DayBoard</h2>
                    {error
                        ? <p className='red'>There was an error, try again</p>
                        : <MediaQuery minDeviceWidth={500}>
                        {(matches) =>
                            matches
                                ? this.renderDayCircleLinks()
                                : this.renderDayColumnLinks()
                        }
                    </MediaQuery>}

                </section>

                <div className='help-link-container' >
                    <Link
                        className='help-link'
                        to={{
                            pathname: '/',
                            state: { fromDashboard: true }
                        }} >
                        help
                     </Link>
                </div>

            </div>
        )
    }
}
