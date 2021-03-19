import toast, { Toaster } from 'react-hot-toast';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FriendsContext from '../../contexts/FriendsContext'
import WekendApiService from '../../services/Wekend-api-service'
import RequestSent from '../../components/RequestSent/RequestSent'
import RequestReceived from '../../components/RequestReceived/RequestReceived'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './FriendsPage.css'
import CurrentFriend from '../../components/CurrentFriend/CurrentFriend'

export default class FriendsPage extends Component {
  state = {
    loading: true
}
setLoading = (trueOrFalse) =>{
  this.setState({loading: trueOrFalse})
}

deleteNotify = ()=>  toast.success("deleted")

    static contextType = FriendsContext
    static defaultProps = {
        match: { params: {} },
      }
    componentDidMount() {
         
        this.context.clearError()
        WekendApiService.getFriends()
            .then(this.context.setFriends)
            .then(()=>this.setLoading(false))
            .catch(this.context.setError)
    }

    renderCurrentFriends() {
        const { friends = [] } = this.context
        let allFriends = friends.filter(friend=> 
            friend.confirmed === true)

        return (!allFriends.length)?<p>No amigos at the moment...</p> : allFriends.map((friend, i) =>
          <CurrentFriend
            key={1+ friend.receiver_id + friend.sender_id}
            friend={friend}
            deleteNotify={this.deleteNotify}
          />
        )
      }
      renderRequestsSent() {
        const { friends = [] } = this.context
      
        let friendRequests = friends.filter(friend=> 
            (!friend.confirmed)&&(friend.friend_id===friend.receiver_id))

        return (!friendRequests.length)? <p>You have no pending friend requests</p>:friendRequests.map(friend =>
          <RequestSent
            key={friend.receiver_id+friend.sender_id}
            friend={friend}
            deleteNotify={this.deleteNotify}
          />
        )
      }
      renderRequestsReceived() {
        const { friends = [] } = this.context
      
 
        let requestsReceived = friends.filter(friend=> 
          (!friend.confirmed)&&(friend.friend_id===friend.sender_id))
           
        return (!requestsReceived.length) ? <p>You have no pending friend requests</p>: requestsReceived.map(friend =>
          <RequestReceived
            key={friend.receiver_id + friend.sender_id}
            friend={friend}
            deleteNotify={this.deleteNotify}
          />
        )
      }

    render() {
        const { error } = this.context
 
        return (
            <section className='FriendPage'>
                  <Toaster position="top-center" />
              <article className='FriendPage article'>
                <div className='friends-header'>
                <h2>Your Friends</h2>
                
                <Link to='/friend-search' className='get-new-friends-link'>get some new friends</Link>
                </div>
               
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.state.loading
                    ?  <div className='loader-container'>
                    <div className='Loader'>
                    <div className="loader-circle-overlay"  > 
                    <i className="fas fa-moon small-moon"><FontAwesomeIcon className='small-moon' icon='moon' /></i>
                    </div>
                        </div>
                        </div>
                : this.renderCurrentFriends()}
                    </article>

                    <article className='FriendPage article'>
                    <h2>Pending Requests Sent</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.state.loading
                    ?  <div className='loader-container'>
                    <div className='Loader'>
                    <div className="loader-circle-overlay"  > 
                    <i className="fas fa-moon small-moon"><FontAwesomeIcon className='small-moon' icon='moon' /></i>
                    </div>
                        </div>
                        </div>
                :this.renderRequestsSent()}
                    </article>
                    <article className='FriendPage article'>
                        <h2>Pending Requests Received</h2>
                {error
                    ? <p className='red'>There was an error, try again</p>
                    : this.state.loading
                    ?  <div className='loader-container'>
                    <div className='Loader'>
                    <div className="loader-circle-overlay"  > 
                    <i className="fas fa-moon small-moon"><FontAwesomeIcon className='small-moon' icon='moon' /></i>
                    </div>
                        </div>
                        </div>
                : this.renderRequestsReceived()}
                    </article>
            </section>
        )
    }
}
