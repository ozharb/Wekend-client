import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import FriendsContext from '../../contexts/FriendsContext'
import WekendApiService from '../../services/Wekend-api-service'
import CurrentFriend from '../../components/CurrentFriend/CurrentFriend'
import RequestSent from '../../components/RequestSent/RequestSent'
import RequestReceived from '../../components/RequestReceived/RequestReceived'
import './FriendsPage.css'

export default class FriendsPage extends Component {
    static contextType = FriendsContext
    static defaultProps = {
        match: { params: {} },
      }
    componentDidMount() {
         
        this.context.clearError()
        WekendApiService.getFriends()
            .then(this.context.setFriends)
            .catch(this.context.setError)
    }

    renderCurrentFriends() {
        const { friends = [] } = this.context
      
        let allFriends = friends.filter(friend=> 
            friend.confirmed === true)

        return allFriends.map((friend, i) =>
          <CurrentFriend
            key={friend.receiver_id + friend.sender_id}
            friend={friend}
          />
        )
      }
      renderRequestsSent() {
        const { friends = [] } = this.context
      
 
        let friendRequests = friends.filter(friend=> 
            (!friend.confirmed)&&(friend.friend_id===friend.receiver_id))

         
        return friendRequests.map(friend =>
          <RequestSent
            key={friend.receiver_id+friend.sender_id}
            friend={friend}
          />
        )
      }
      renderRequestsReceived() {
        const { friends = [] } = this.context
      
 
        let requestsReceived = friends.filter(friend=> 
          (!friend.confirmed)&&(friend.friend_id===friend.sender_id))

         
         
        return requestsReceived.map(friend =>
          <RequestReceived
            key={friend.receiver_id + friend.sender_id}
            friend={friend}
          />
        )
      }

    render() {
        const { error } = this.context
 
        return (
            <section className='FriendPage'>
                <h2>Your Friends</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderCurrentFriends()}
                    <h2>Pending Requests Sent</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderRequestsSent()}
                        <h2>Pending Requests Received</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderRequestsReceived()}
            </section>
        )
    }
}
