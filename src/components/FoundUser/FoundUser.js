import { Toaster } from 'react-hot-toast';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import WekendApiService from '../../services/Wekend-api-service';
import './FoundUser.css';
import FriendsContext from '../../contexts/FriendsContext';


export default class FoundUser extends Component {
    static contextType = FriendsContext
    state = {
        error: null,
        requesting: false
    };

    handleRequest = e => {
        this.setState({ requesting: true })
    }
    handleUnRequest = e => {
        this.setState({ requesting: false })
    }

    sendFriendRequest = e => {
        e.preventDefault()

        const { user } = this.props



        WekendApiService.postFriendRequest(user.id)
            .then(friendRes => {
                this.context.addFriend(friendRes)

                this.props.submitRequest()
                setTimeout(() => {
                    this.props.history.goBack()
                }, 2000)
            })

            .catch(error => this.setState({ error: error.error }))

    }
    render() {

        const { user } = this.props
        let friendClassName = (user.username.length > 12) ? 'small-font' : 'large-font'

        let foundUserHeading = <>
            {user.username}<br />
            <span className='founder-user-heading'>located in {user.city}</span>
        </>
        let errorMessage = <div className='error-message-friend-request'>
            Hmm...<span className='error-message-details'>{this.state.error}</span>
            <br />
            <Link to='/friends'>Go to Dashboard</Link>
        </div>
        return (
            <>
                <div className='Friends-List'>
                    <Toaster position="top-center" />
                    <div className='current-friend'>
                        {this.state.error ? errorMessage :
                            <div className='friend-not-deleting'>
                                <h2 className={friendClassName} >{this.state.requesting
                                    ? `Send friend request to ${user.username}?`
                                    : foundUserHeading}</h2>
                                <div className='delete-friend-container'>
                                    {this.state.requesting
                                        ? <div className='yes-no-buttons'>
                                            <button className='request-friend' onClick={this.handleUnRequest}>No</button>
                                            <button className='request-friend-yes' onClick={this.sendFriendRequest}><span className='request-friend-yes'>Yes</span></button>
                                        </div>
                                        :
                                        <button className='request-friend' onClick={this.handleRequest}>Send Request</button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    }
}
FoundUser.defaultProps = {
    user: {
        username: '',
    },
}

FoundUser.propTypes = {
    props: PropTypes.shape({
        user: PropTypes.object,
        submitRequest: PropTypes.func,
        history: PropTypes.object,
        match: PropTypes.shape({
            params: PropTypes.object,
        })
    })
}