import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import WekendApiService from '../../services/Wekend-api-service'

// import { Link } from 'react-router-dom'
// import { ThingStarRating } from '../ThingStarRating/ThingStarRating'
import './FoundUser.css'
import FriendsContext from '../../contexts/FriendsContext';



export default class FoundUser extends Component {
    static contextType = FriendsContext
    state = {
        error: null,
        requesting: false
    };

    handleRequest=e=>{
    this.setState({requesting: true})
}
handleUnRequest=e=>{
    this.setState({requesting:false})
}

sendFriendRequest = e => {
    e.preventDefault()
     
    const {user} = this.props
 


  WekendApiService.postFriendRequest(user.id)
  .then(friendRes =>{
      this.context.addFriend(friendRes)
    .then(this.props.submitRequest)
  })
  
  .catch(error => { console.error({ error }) })
  }
    render() {

        const {user} = this.props
        let friendClassName = (user.username.length > 12) ? 'small-font' : 'large-font'
        // const expandButtonText = this.state.expand
        // ?  <i className="fas fa-chevron-down"><FontAwesomeIcon className='chevron' icon='chevron-down' /></i> 
        // :   <i className="fas fa-chevron-right"><FontAwesomeIcon className='chevron' icon='chevron-right' /></i>

        let foundUserHeading = <>
        {user.username}<br/>
         <span className='founder-user-heading'>located in {user.city}</span>
         </>
        return (
            <>
                {/* <Link to={`/thing/${thing.id}`} className='ThingListItem'> */}

                <div className='Friends-List'>
                    <Toaster position="top-center" />
                    <div className='current-friend'>
                            <div className='friend-not-deleting'>
        <h2 className={friendClassName} >{this.state.requesting
        ? `Send friend request to${user.username}?`
        : foundUserHeading }</h2>
                        <div className='delete-friend-container'>
                            {this.state.requesting
                        ?<div className='yes-no-buttons'>
                        <button className='delete-friend' onClick={this.handleUnRequest}>No</button> 
                        <button className='delete-friend-yes' onClick={this.sendFriendRequest}><span className='delete-friend-yes'>Yes</span></button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.handleRequest}>Send Request</button>
                        }
                        </div>
                        </div>
                    </div>
                </div>
                {/* </Link> */}
            </>
        )
    }
}

// function readableReviewCount(number) {
//   switch(number) {
//     case 0:
//       return 'no reviews yet'

//     case 1:
//       return `based on 1 review`

//     default:
//       return `based on ${number} reviews`
//   }
// }

// function truncate(text) {
//   const words = text.split(' ')

//   if (words.length > 10) {
//     return words.slice(0, 10).join(' ') + ' ...'
//   }

//   return text
// }
