import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, withRouter } from 'react-router-dom'
import WekendApiService from '../../services/Wekend-api-service'

// import { Link } from 'react-router-dom'
// import { ThingStarRating } from '../ThingStarRating/ThingStarRating'
import './FilterFriend.css'
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
    console.log('FILTER friend')
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
    console.log('Unfilter friend')
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

        let username = 'user'
        const user = window.localStorage.getItem(username)
        const { friend } = this.props
        let friendClassName = (friend.friend.length > 12) ? 'small-font' : 'large-font'
        // const expandButtonText = this.state.expand
        // ?  <i className="fas fa-chevron-down"><FontAwesomeIcon className='chevron' icon='chevron-down' /></i> 
        // :   <i className="fas fa-chevron-right"><FontAwesomeIcon className='chevron' icon='chevron-right' /></i>


        return (
            <>
                {/* <Link to={`/thing/${thing.id}`} className='ThingListItem'> */}

                <div className='Friends-List'>

                    <div className='current-friend'>
                            <div className='friend-not-deleting'>
                        <h2 className={friendClassName} >{friend.friend}</h2>
                        <div className='delete-friend-container'>
                            {this.state.filter
                        ?<div className='yes-no-buttons'>
                        <button className='delete-friend-yes' onClick={this.UnfilterFriend}>filter is on</button>
                        </div>
                        : 
                        <button className='delete-friend' onClick={this.filterFriend}>filter is off</button>
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
