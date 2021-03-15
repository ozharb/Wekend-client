import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import AuthApiService from '../../services/auth-api-service'
import { Input } from '../../Utils/Utils'
// import AppContext from '../../contexts/AppContext'
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }
  // static contextType = AppContext

  state = { error: null,
            loginStatus: false }

  

  handleSubmitJwtAuth = ev => {
      ev.preventDefault()
      this.setState({ error: null })
      const { username, password } = ev.target
      AuthApiService.postLogin({
        username: username.value,
        password: password.value,
      })
        .then(res => {
           
          const user_name = 'user'
          username.value = ''
          password.value = ''

          window.localStorage.setItem(user_name, res.username)
           console.log(res)

          TokenService.saveAuthToken(res.authToken)
          this.props.onLoginSuccess()
          this.setState({loginStatus: true})
        
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
    showPassword = e => {
      const password = document.getElementById("LoginForm__password")
    
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    } 
  render() {
    const { error, loginStatus } = this.state
  

    return (
      
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
           </div>
          {loginStatus? <p className='green'>Success!</p> : 
          <>
        <div className='username'>
          <label htmlFor='LoginForm__username'>
            User name
          </label>
          <Input
            required
            name='username'
            id='LoginForm__username'
            autoComplete="username">
          </Input>
        </div>

        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <span className = "show-password">
           <input name="show-password" type="checkbox" onClick={this.showPassword} />Show Password
           </span>
          <Input
            required
            name='password'
            type='password'
            id='LoginForm__password'
            autoComplete = "current-password"
            >
           
          </Input>
        </div>
       
        <button className='login-submit btn' type='submit'>
          Login
        </button>
         </>}
      </form>
    )
  }
}
