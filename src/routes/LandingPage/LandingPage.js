import React, { Component } from 'react'
import './LandingPage.css'
import { Link } from "react-router-dom"
import main from './images/friends.jpg'
// import allLists from './images/budgitz-screenshot-all-lists.jpg'
// import userStatus from './images/budgitz-screenshot-user-info.jpg'

export default class RegistrationPage extends Component {
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
        </header>
        <h3>WEkend together</h3>
        <p>De-lonelify your weekends with WEkend</p>

        <section className="app-features">
          <h3>Let your friends know what you have planned this weekend and see what their plans are without having to ask.</h3>

          {/* <img src={allLists} width="200" className="app-screenshot home" alt="app-screesnshot-home-page" /> */}
          <p> Make the most of your weekend.</p>
        </section>
        <section>
          <h3>The app for Weekend Warriors.</h3>
          <img src={main} width="500" className="app-screenshot main" alt="app-screesnshot-main" />
          <p>See who's doing what when so can you do that too with them!</p>
          <p><em>"How's about to text my bestie 'wyd' but instead I just opened up WEkend!" - App user, Marty McPhly</em></p>
          {/* <img src={userStatus} width="200" className="app-screenshot main" alt="app-screesnshot-main" /> */}
          <h4>Add More BudGitz and watch your status go up!</h4>
          <p>Start out as a Lil Budgitter; add enough Budgitz and get to coveted Legendary status.</p>
          <p>FMO be gone!</p>
      </section>
        <section>
          <h3>Register your new account now and make this WEkend cooler than froyo</h3>
          <Link className="register-button"
            to={"/register"}>
            Register
        </Link>
          <h3>Don't waste a precious second of your weekend.</h3>
        </section>
      </ article>

    )
  }
}
