import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './UserInfo.css'
// import AppContext from '../contexts/AppContext'
import TokenService from '../services/token-service'


class UserInfo extends Component {
  

// static contextType = AppContext;

handleLogoutClick = () => {
    let username = 'user'
    TokenService.clearAuthToken()
    window.localStorage.removeItem(username)

  }

render(){
    // const { lists=[] } = this.context
  
    let username = 'user'
    const user =  window.localStorage.getItem(username)
  return (
    <div className = 'menu-items'>

  <Link className='dayboard' to='/days'>home</Link>    


    <ul className="list">
   
Hi {user}


<div className='side2'>
  <li className="li-add-event"><Link to = '/new-event'>Add Event</Link></li>
<div className='row1'>
  <li className="li-filter">Filter</li><li className="li-friends"><Link to='/friends'>Friends</Link></li>
</div>
<li className="li-logout"><Link
onClick={this.handleLogoutClick}
to='/login'
className = "logout">
Logout
</Link> </li>
</div>
   </ul>
 </div>

  )
}
}

export default UserInfo