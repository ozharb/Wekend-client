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


deleteFriendFinal = e => {
    e.preventDefault()
    let username = 'user'
    const user =  window.localStorage.getItem(username)
    const {friend} = this.props
    const friendId = friend.friend_id

const userId = friend.sender === user ? friend.sender_id : friend.receiver_id

  WekendApiService.deleteFriendship(friendId)
  .then(this.context.deleteFriend(friendId,userId))
  .then(this.props.deleteNotify)
  .catch(error => { console.error({ error }) })
  }
    render() {
        const { friend } = this.props

        let friendClassName = (friend.friend.length > 12) ? 'small-font' : 'large-font'
        return (
            <>
                <div className='Friends-List'>
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
