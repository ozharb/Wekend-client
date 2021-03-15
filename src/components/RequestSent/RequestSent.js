import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import WekendApiService from '../../services/Wekend-api-service'
import './RequestSent.css'
import FriendsContext from '../../contexts/FriendsContext';



export default class RequestSent extends Component {
    static contextType = FriendsContext
    state = {
        expand: false,
        error: null,
        deleting: false
    };
    handleExpand = e => {
        this.setState({
            expand: !this.state.expand
        })
    }
handleDelete=e=>{
    this.setState({deleting: true})
}
handleUnDelete=e=>{
    this.setState({deleting:false})
}
notify = () => toast((t) => (
    <span className = 'alert-message'>
 deleted
      <button onClick={() => toast.dismiss(t.id)}>
        Cool
      </button>
    </span>

  )  );
deleteFriendFinal = e => {
    e.preventDefault()
     
    let username = 'user'
    const user =  window.localStorage.getItem(username)
    const {friend} = this.props
    const friendId = friend.friend_id

const userId = friend.sender === user ? friend.sender_id : friend.receiver_id

  WekendApiService.deleteFriendship(friendId)
  .then(this.context.deleteFriend(friendId,userId))
  .then(this.notify)
  .catch(error => { console.error({ error }) })
  }
    render() {
        const { friend } = this.props

        let friendClassName = (friend.friend.length > 12) ? 'small-font' : 'large-font'
        return (
            <>
                {/* <Link to={`/thing/${thing.id}`} className='ThingListItem'> */}

                <div className='Friends-List'>
                    <Toaster position="top-center" />
                    <div className='current-friend'>
                            <div className='friend-not-deleting'>
                        <h2 className={friendClassName} >{this.state.deleting? `Delete ${friend.friend}?`: friend.friend}</h2>
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
