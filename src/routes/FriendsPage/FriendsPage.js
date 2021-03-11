import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import FriendsContext from '../../contexts/FriendsContext'
import WekendApiService from '../../services/Wekend-api-service'
import CurrentFriend from '../../components/CurrentFriend/CurrentFriend'
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

            let currentFriends
        return allFriends.map((friend, i) =>
          <CurrentFriend
            key={friend.receiver_id + friend.sender_id}
            friend={friend}
          />
        )
      }
      // renderRequestsSent() {
      //   const { friends = [] } = this.context
      
 
      //   let allFriends = friends.filter(friend=> 
      //       friend.confirmed === true)

          
      //       let requestsSent
         
      //   return currentFriends.map(event =>
      //     <RequestSent
      //       key={event.id}
      //       event={event}
      //     />
      //   )
      // }
      // renderRequestsReceived() {
      //   const { friends = [] } = this.context
      
 
      //   let allFriends = friends.filter(friend=> 
      //       friend.confirmed === true)

          
      //       let requestsSent
         
      //   return currentFriends.map(event =>
      //     <RequestsReceived
      //       key={event.id}
      //       event={event}
      //     />
      //   )
      // }

    render() {
        const { error } = this.context
 
        return (
            <section className='FriendPage'>
                <h2>Friends</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderCurrentFriends()}
               
            </section>
        )
    }
}
