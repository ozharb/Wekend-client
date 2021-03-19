import React, { Component } from 'react'


const FriendsContext = React.createContext({
    friends: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setFriends: () => { },
    confirmFriend: () => { },
    changeReceiverFilter: () => { },
    changeSenderFilter: () => { },
    deleteFriend: () => { },
    addFriend: () => { },
})

export default FriendsContext

export class FriendsProvider extends Component {
    state = {
        friends: [],
        error: null,
    };

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setFriends = friends => {
        this.setState({ friends })
    }
    confirmFriend = (friendId, userId) => {
        this.setState({
            friends: this.state.friends.map(i =>
                (i.friend_id === friendId && i.receiver_id === userId)
                    ? { ...i, confirmed: true }
                    : i
            )
        })
    }

    changeReceiverFilter = (friendId, userId, trueOrFalse) => {
        this.setState({
            friends: this.state.friends
                .map(i =>
                    ((i.friend_id === friendId && userId === i.sender_id) || (i.friend_id === friendId && userId === i.receiver_id))
                        ? { ...i, receiver_filter: trueOrFalse }
                        : i
                )
        })
    }
    changeSenderFilter = (friendId, userId, trueOrFalse) => {
        this.setState({
            friends: this.state.friends
                .map(i =>
                    ((i.friend_id === friendId && userId === i.sender_id) || (i.friend_id === friendId && userId === i.receiver_id))
                        ? { ...i, sender_filter: trueOrFalse }
                        : i
                )
        })
    }
    deleteFriend = (friendId, userId) => {
        this.setState({
            friends: this.state.friends.filter(i =>
                (i.friend_id !== friendId && userId !== i.sender_id) || (i.friend_id !== friendId && userId !== i.receiver_id)
            )
        })
    }

    addFriend = friend => {
        this.setState({
            friends: [
                ...this.state.friends,
                friend
            ]
        })
    }

    render() {
        const value = {
            friends: this.state.friends,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setFriends: this.setFriends,
            confirmFriend: this.confirmFriend,
            changeReceiverFilter: this.changeReceiverFilter,
            changeSenderFilter: this.changeSenderFilter,
            deleteFriend: this.deleteFriend,
            addFriend: this.addFriend,
        }
        return (
            <FriendsContext.Provider value={value}>
                {this.props.children}
            </FriendsContext.Provider>
        )
    }
}
