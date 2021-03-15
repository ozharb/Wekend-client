import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required } from '../../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'

export default class RegistrationForm extends Component {
state = { error: null,
         registered: false }

  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  

  handleSubmit = ev => {
    ev.preventDefault()
    const { fullname, nickname, username, city, password } = ev.target
    this.setState({ error: null })
      AuthApiService.postUser({
        username: username.value,
        password: password.value,
        fullname: fullname.value,
        nickname: nickname.value,
        city: city.value,
      })
        .then(user => {

    fullname.value = ''
    nickname.value = ''
    username.value = ''
    password.value = ''
    city.value = ''
    this.setState({registered:true})    
     this.props.onRegistrationSuccess()
  })
  .catch(res => {

    this.setState({ error: res.error })
  })
  }

  showPassword = e => {
    const password = document.getElementById("RegistrationForm__password")
  
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  // componentDidMount(){
  //   window.scrollTo(0, 0)
  // }
  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        { this.state.registered ? <p className='green'>Registration complete.</p>:
        <>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name'>
            Full name <Required />
          </label>
          <Input
            name='fullname'
            type='text'
            required
            id='RegistrationForm__fullname'>
          </Input>
        </div>
        <div className='username'>
          <label htmlFor='RegistrationForm__username'>
            User name <Required />
          </label>
          <Input
            name='username'
            type='text'
            required
            id='RegistrationForm__username'
            autoComplete="username">
          </Input>
        </div>
        
        <div className='password'>
       
          <label htmlFor='RegistrationForm__password'>
          Password <Required />{' '}
        <span className="tool" data-tip="Password must be longer than 8 characters and contain 1 upper case, lower case, number and special character" tabIndex="1"> 
          {' '} ⓘ
          
           </span>
           <span className = "show-password">
           <input name="show-password" type="checkbox" onClick={this.showPassword} />Show Password
           </span>
           <label className="password-tip"><br />Password must be longer than 8 characters and contain 1 upper case, lower case, number and special character </label> 
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'
            autoComplete="new-password">
          </Input>
          
        </div>
        <div className='nickname'>
          <label htmlFor='RegistrationForm__nickname'>
            Nickname
          </label>
          <Input
            name='nickname'
            type='text'
            id='RegistrationForm__nickname'>
          </Input>
        </div>
        <div className='city'>
          <label htmlFor='RegistrationForm__city'>
            City
          </label>
          <Input
            name='city'
            type='text'
            id='city'>
          </Input>
        </div>
        <button type='submit'>
          Register
        </button>
        <Link to='/login'>Already have an account?</Link>
        </>}
      </form>
    )
  }
}
