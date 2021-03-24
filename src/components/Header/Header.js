import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserInfo from '../../UserInfo/UserInfo'
import TokenService from '../../services/token-service'
import './Header.css'
import { CSSTransition } from 'react-transition-group';
import Logo from './Logo/Logo';
export default class Header extends Component {

  state = {
    expand: false
  }
  handleItemExpand = e => {
    this.setState({
      expand: !this.state.expand
    })
  }
  handleLogoutClick = () => {
    let username = 'user'
    TokenService.clearAuthToken()
    window.localStorage.removeItem(username)

  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/login'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
      
          <Link
            to='/register'>
            Register
        </Link>
          <Link
            to='/login'>
            Log in
        </Link>

      </div>
    )
  }


  render() {

    const logLink = TokenService.hasAuthToken()
      ? null
      : this.renderLoginLink()
    return (

      <nav className='Header'>
        <h1>
        {!TokenService.hasAuthToken() &&
          <Link to='/'>
            WEkend
          </Link>
  }
        </h1>
        <div className='Header-user-info'>
          <div className="logout">
            <div>{logLink} </div>
          </div>
          {TokenService.hasAuthToken() &&
            <section className="user-profile"
            
             onClick={this.handleItemExpand}
            >
                <Logo  />
              <div className="user-menu" >
                <CSSTransition
                  in={this.state.expand}
                  timeout={2000}
                  classNames="display"
                  unmountOnExit
                >
                  <div className="menu">
                    <UserInfo />
                  </div>
                </CSSTransition>
              </div>

            </section>
          }
        </div>
      </nav>

    )
  }
}
