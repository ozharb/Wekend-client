import React, { Component } from 'react'
import './LandingPage.css'
import { Link } from "react-router-dom"
import main from './images/wekend-landing-image.jpg'
import smallLogo from './images/logo512.png'
import speechBubble from './images/speech-bubble.png'
import alertScreenshot from './images/alert-screenshot.jpg'
import expandedScreesnshot from './images/wekend-expanded-screenshot.jpg'
import PropTypes from 'prop-types';
import PreloadImage from 'react-preload-image'

export default class LandingPage extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  }



  render() {
    return (
      <article className='LandingPage'>

        <header role="banner">
          <h1>WEkend</h1>

          <h2>The friendly weekend planning app for friends</h2>
        </header>
        <section className="app-features">

          <p> Make friends, post events, and see what's up this weekend</p>
        </section>
        <section className='friends-image'>
          <PreloadImage
            className="banner-main"
            src={main}
            alt="drawing of two friends using the app"
            lazy
          />
        </section>

        <p>See who's doing what when so you can do that too－with them!</p>
        <img src={alertScreenshot} width="300" className="screenshot" alt="screenshot of update alert" />
        <p>RSVP to your friends' events and see when details get changed so you can stay in the know.</p>
        <img src={expandedScreesnshot} width="300" className="screenshot" alt="screenshot of expanded view" />
        <p>Get the who, what, when details for every event.</p>
        <p>Even see if someone didn't get an event update so you can let them know and everyone can stay in the know.</p>
        <p><em>"Yoga got pushed back to 1:15 Mary. Check the app!"- Mary's friend</em></p>
        <p><em>"Cool. Thanks. I should check that app more often!"- Mary</em></p>
        <p><em>"Yeah. You should."- Mary's friend</em></p>
        <div className='speech-bubble-text'>
          <div className="speech-text">
            <p>FMO <br />be gone!</p>
          </div>
          <div className='speech-bubble'>
            <img src={speechBubble} width="300" className="speech-bubble-landing-page" alt="speech bubble" />
          </div>
        </div>
        <section className='landing-page-register 1'>
          <h3>Register your new account now and make this WEkend cooler than froyo</h3>
          <Link className="register-button"
            to={"/register"}>
            Register
        </Link>
          <h3>Don't waste a precious second of your weekend.</h3>
        </section>
        <section className='app-how-to-use'>
          <h3>A Quick How-To Guide</h3>
          <h4>Let the eye be your guide</h4>
          <img src={smallLogo} width="100" className="logo-landing-page" alt="app-screesnshot-main" />
          <p>Once you're logged in, poke the eye at the top of the page to navigate the app</p>
          <p><span className='home-word-landingpage'>Home</span> takes you to the main day-board where you can pick the day you want to see.</p>
          <p><span className='friends-word-landingpage'>Friends</span> takes you to your friends dashboard where you can send friend requests and see any pending requests sent or received.</p>
          <p>Use the <span className='filter-word-landingpage'>Filter</span>  to filter your events by specific friends.</p>
          <p>Use <span className='add-event-word-landingpage'>Add Event</span>  to post new events.</p>
          <p>Once your event is posted, you can go back to the day page to see your events and make any updates you want.</p>
          <p>It's recommended you remove events after they happen to keep people's day pages up to date.</p>
        </section>
        <section className='landing-page-register landing-page-bottom'>
          <h3>Be a good friend and get WEkend</h3>
          <Link className="register-button"
            to={"/register"}>
            Register
        </Link>
          <h3>All your friends are doing it.</h3>
        </section>
      </ article>

    )
  }
}
LandingPage.propTypes = {
  props: PropTypes.shape({
      history: PropTypes.object,
      match: PropTypes.shape({
          params: PropTypes.object,
      })
  })
}