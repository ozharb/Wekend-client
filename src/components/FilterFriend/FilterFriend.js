import React, { Component } from 'react';
import WekendApiService from '../../services/Wekend-api-service';
import PropTypes from 'prop-types';
import './FilterFriend.css';
import FriendsContext from '../../contexts/FriendsContext';



export default class FilterFriend extends Component {
    static contextType = FriendsContext
    state = {
        expand: false,
        error: null,
        filter: ''
    };
    componentDidMount(){
        const { friend } = this.props
        const userFilter = friend.friend_id===friend.receiver_id
        ? friend.sender_filter
        : friend.receiver_filter
        this.setState({filter: userFilter})
    }
    handleFilterSet = trueOrFalse =>{
        this.setState({filter: trueOrFalse})
    }


filterFriend = e => {
    e.preventDefault()
    const {friend} = this.props
    const friendId = friend.friend_id
const userId = friend.receiver === friend.friend? friend.sender_id : friend.receiver_id
const contextFilter = friend.receiver === friend.friend 
? this.context.changeSenderFilter(friendId,userId, true)
: this.context.changeReceiverFilter(friendId,userId, true)
  WekendApiService.filterFriend(friendId, true)
  .then(contextFilter)
  .then(this.handleFilterSet(true))
  .catch(error => { console.error({ error }) })
  }
  UnfilterFriend = e => {

    e.preventDefault()
    const {friend} = this.props
    const friendId = friend.friend_id
const userId = friend.receiver === friend.friend? friend.sender_id : friend.receiver_id
const contextFilter = friend.receiver === friend.friend 
? this.context.changeSenderFilter(friendId,userId, false)
: this.context.changeReceiverFilter(friendId,userId, false)
  WekendApiService.filterFriend(friendId, false)
  .then(contextFilter)
  .then(this.handleFilterSet(false))
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
                        <h2 className={friendClassName} >{friend.friend}'s events are</h2>
                        <div className='delete-friend-container'>
                            {this.state.filter
                        ?<div className='yes-no-buttons'>
                        <button className='delete-friend-yes' onClick={this.UnfilterFriend}>invisible</button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.filterFriend}>visible</button>
                        }
                        </div>
                        </div>
        
                    </div>
                </div>
            </>
        )
    }
}

FilterFriend.defaultProps = {
    friend:{
        sender:'',
        friend_id:''
    },
  } 
  
  FilterFriend.propTypes = {
    props: PropTypes.shape({
      friend: PropTypes.object,
    })
  }