import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import WekendApiService from '../../services/Wekend-api-service'

// import { Link } from 'react-router-dom'
// import { ThingStarRating } from '../ThingStarRating/ThingStarRating'
import './RequestReceived.css'
import FriendsContext from '../../contexts/FriendsContext';



export default class RequestReceived extends Component {
    static contextType = FriendsContext
    state = {
        expand: false,
        error: null,
        deleting: false,
        accepting: false
    };
    handleAccept = e => {
        this.setState({
            accepting: true,
            deleting: false
        })
    }
handleDelete=e=>{
    this.setState({deleting: true,
    accepting: false})
}
handleUnDelete=e=>{
    this.setState({deleting:false})
}
handleUnAccept=e=>{
    this.setState({accepting:false})
}
acceptFriendFinal = e => {
    e.preventDefault()
     
    let username = 'user'
    const user =  window.localStorage.getItem(username)
    const {friend} = this.props
    const friendId = friend.friend_id

const userId = friend.sender === user ? friend.sender_id : friend.receiver_id

  WekendApiService.acceptFriendRequest(friendId)
  .then(this.context.confirmFriend(friendId,userId))
  .catch(error => { console.error({ error }) })
  }
deleteFriendFinal = e => {
    e.preventDefault()
     
    let username = 'user'
    const user =  window.localStorage.getItem(username)
    const {friend} = this.props
    const friendId = friend.friend_id

const userId = friend.sender === user ? friend.sender_id : friend.receiver_id

  WekendApiService.deleteFriendship(friendId)
  .then(this.context.deleteFriend(friendId,userId))
  .catch(error => { console.error({ error }) })
  }
    render() {

        let username = 'user'
        const user = window.localStorage.getItem(username)
        const { friend } = this.props

        // const expandButtonText = this.state.expand
        // ?  <i className="fas fa-chevron-down"><FontAwesomeIcon className='chevron' icon='chevron-down' /></i> 
        // :   <i className="fas fa-chevron-right"><FontAwesomeIcon className='chevron' icon='chevron-right' /></i>

 const friendName = (friend) => {
     if(this.state.deleting) {
       return  `Delete ${friend}'s request?`
} else if (this.state.accepting){
    return `Accept ${friend}'s request?`
} else {
    return friend
}
     } 

        return (
            <>
                {/* <Link to={`/thing/${thing.id}`} className='ThingListItem'> */}

                <div className='Friends-List'>
                    <Toaster position="top" />
                    <div className='current-friend'>
                            <div className='friend-not-deleting'>
                            {this.state.accepting
                        ?<div className='yes-no-buttons'>
                        <button className='accept-friend' onClick={this.handleUnAccept}>No</button> 
                        <button className='accept-friend-yes' onClick={this.acceptFriendFinal}><span className='accept-friend-yes'>Yes</span></button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.handleAccept}>Accept</button>
                        }
        <h2 className='Friends-List_heading' >{friendName(friend.friend)}</h2>
                        <div className='delete-friend-container'>
                            {this.state.deleting
                        ?<div className='yes-no-buttons'>
                        <button className='delete-friend' onClick={this.handleUnDelete}>No</button> 
                        <button className='delete-friend-yes' onClick={this.deleteFriendFinal}><span className='delete-friend-yes'>Yes</span></button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.handleDelete}>Delete</button>
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
