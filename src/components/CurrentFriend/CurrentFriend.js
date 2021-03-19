import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import WekendApiService from '../../services/Wekend-api-service'
import './CurrentFriend.css'
import FriendsContext from '../../contexts/FriendsContext';



export default class CurrentFriend extends Component {
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
friend deleted
      <button onClick={() => toast.dismiss(t.id)}>
        Cool
      </button>
    </span>
  ));
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
        let friendClassName = (friend.friend.length > 7) ? 'small-font' : 'large-font'

        return (
            <>
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
            </>
        )
    }
}

CurrentFriend.defaultProps = {
    friend:{
        sender:'',
        friend_id:''
    },
  } 
  
  CurrentFriend.propTypes = {
    props: PropTypes.shape({
      friend: PropTypes.object,
    })
  }