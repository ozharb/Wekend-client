import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Section } from '../../Utils/Utils'


export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
   const { history } = this.props
  
  setTimeout(() => {
      history.go(0)
     }, 1000); 
     
  setTimeout(() => {
  
        history.push('/days')
        
     }, 2001); 
  }

  render() {
    return (
      <Section className='LoginPage'>
        <h2>Login</h2>
        <p>Demo the app with the following info:</p>
        <p>username: Demo</p>
        <p>password: Demo2021!</p>
        <LoginForm
        onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
}
