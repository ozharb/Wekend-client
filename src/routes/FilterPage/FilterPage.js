import React, { Component } from 'react'
import FriendsContext from '../../contexts/FriendsContext'
import WekendApiService from '../../services/Wekend-api-service'
import FilterFriend from '../../components/FilterFriend/FilterFriend'
import './FilterPage.css'

export default class Filterpage extends Component {
    static contextType = FriendsContext

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

        return (!allFriends.length)?<p>No amigos at the moment...</p> : allFriends.map((friend, i) =>
          <FilterFriend
            key={friend.receiver_id + friend.sender_id}
            friend={friend}
          />
        )
      }
     

    render() {
        const { error } = this.context
 
        return (
            <section className='FriendPage'>
                  
              <article className='FriendPage article'>
                <h2>Filter by Friends</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.renderCurrentFriends()}
                    </article>
                   
            </section>
        )
    }
}
