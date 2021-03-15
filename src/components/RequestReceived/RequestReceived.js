import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import WekendApiService from '../../services/Wekend-api-service'
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
friendAcceptnotify = () => toast((t) => (
    <span className = 'alert-message'>
friend made
      <button onClick={() => toast.dismiss(t.id)}>
        Cool
      </button>
    </span>

  )  );
  friendDeletednotify = () => toast((t) => (
    <span className = 'alert-message'>
 request deleted
      <button onClick={() => toast.dismiss(t.id)}>
        Cool
      </button>
    </span>

  )  );
acceptFriendFinal = e => {
    e.preventDefault()
     
    let username = 'user'
    const user =  window.localStorage.getItem(username)
    const {friend} = this.props
    const friendId = friend.friend_id

const userId = friend.sender === user ? friend.sender_id : friend.receiver_id

  WekendApiService.acceptFriendRequest(friendId)
  .then(this.context.confirmFriend(friendId,userId))
  .then(this.friendAcceptnotify)
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
  .then(this.friendDeletednotify)
  .catch(error => { console.error({ error }) })
  }
    render() {

        const { friend } = this.props

 const friendName = (friend) => {
     if(this.state.deleting) {
       return  `Delete ${friend}'s request?`
} else if (this.state.accepting){
    return `Accept ${friend}'s request?`
} else {
    return friend
}
     } 
     let friendClassName = (friend.friend.length > 12) ? 'small-font' : 'large-font'
        return (
            <>
                <div className='Friends-List'>
                    <Toaster position="top-center" />
                    <div className='current-friend'>
                            <div className='friend-not-deleting-accepting'>
                                <div className='accept-friend-container'>
                            {this.state.accepting
                        ?<div className='yes-no-buttons'>
                        <button className='accept-friend' onClick={this.handleUnAccept}>no</button> 
                        <button className='accept-friend yes' onClick={this.acceptFriendFinal}><span className='accept-friend-yes'>yes</span></button>
                        </div>
                        : 
                        <button className='accept-friend' onClick={this.handleAccept}>accept</button>
                     
                        }
                           </div>
        <h2 className={friendClassName} >{friendName(friend.friend)}</h2>
                        <div className='delete-friend-container'>
                            {this.state.deleting
                        ?<div className='yes-no-buttons'>
                        <button className='delete-friend' onClick={this.handleUnDelete}>no</button> 
                        <button className='delete-friend-yes' onClick={this.deleteFriendFinal}><span className='delete-friend-yes'>yes</span></button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.handleDelete}>delete</button>
                        }
                        </div>
                        </div>
        
                    </div>
                </div>
            </>
        )
    }
}

