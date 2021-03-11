import React, { Component } from 'react'


const FriendsContext = React.createContext({
    friends: [],
    error: null,
    setError: () => { },
    clearError: () => { },
    setFriends: () => { },
    confirmFriend: () => { },
    changeFriendFilter: () => { },
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
    confirmFriend = (friendId, userId ) => {
        let friendship = this.state.friends.find(fr => (fr.friend_id === friendId && userId === fr.sender_id) ||
            (fr.friend_id === friendId && userId === fr.receiver_id))
        friendship.confirmed = true
        console.log('confirm frienship:', friendship)
        this.setState({
            friends: this.state.friends.map(i =>
                ((i.friend_id !== friendId && userId !== i.sender_id) || (i.friend_id !== friendId && userId !== i.receiver_id)) ? i :
                    friendship)
        })
    }
//*** test this ***//
    changeFriendFilter = (friendId, userId, trueOrFalse) => {
        let friendship = this.state.friends.find(fr => (fr.friend_id === friendId && userId === fr.sender_id) ||
            (fr.friend_id === friendId && userId === fr.receiver_id))
        friendship.friend_id === friendship.receiver_id
            ? friendship.sender_filter = trueOrFalse
            : friendship.receiver_id = trueOrFalse
        console.log('frienship filter:', friendship)
        this.setState({
            friends: this.state.friends.map(i =>
                ((i.friend_id !== friendId && userId !== i.sender_id) || (i.friend_id !== friendId && userId !== i.receiver_id)) ? i :
                    friendship)
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
            changeFriendFilter: this.changeFriendFilter,
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
