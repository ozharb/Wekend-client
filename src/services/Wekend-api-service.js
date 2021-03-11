import config from '../config'
import TokenService from './token-service'

const WekendApiService = {
  getEvents() {
    return fetch(`${config.API_ENDPOINT}/events/all`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getFriends() {
    return fetch(`${config.API_ENDPOINT}/friends`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  findFriend(usernameToFind) {
    return fetch(`${config.API_ENDPOINT}/friends/find`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        username: usernameToFind
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postFriendRequest(receiverId) {

    return fetch(`${config.API_ENDPOINT}/friends/request`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        receiver_id: receiverId
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  acceptFriendRequest(senderId) {
    return fetch(`${config.API_ENDPOINT}/friends/request`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        sender_id: senderId,
        confirmed: true,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteFriendship(friendId) {
    return fetch(`${config.API_ENDPOINT}/friends/`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        friend_id: friendId,
      }),
    })
      .then(res =>
        (!res.ok)&&res.json().then(e => Promise.reject(e))
      )
  },
  filterFriend(friendId, trueOrFalse) {
    return fetch(`${config.API_ENDPOINT}/friends/`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        friend_id: friendId,
        friend_filter: trueOrFalse
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postEvent(titleVal, timeVal, placeVal, detailsVal, dayVal) {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: titleVal,
        time: timeVal,
        place: placeVal,
        details: detailsVal,
        day:dayVal
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getEvent(eventId){
    return fetch(`${config.API_ENDPOINT}/events/event/${eventId}`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },

  changeEvent(fieldsToUpdate) {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(
      fieldsToUpdate
      )
    })
      .then(res =>
        (!res.ok)&&res.json().then(e => Promise.reject(e))
      )
  },
  postAttendance(eventId) {
    return fetch(`${config.API_ENDPOINT}/attendance`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        event_id: eventId
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  turnOffAlert(eventId) {
      console.log('ALERT ID:',eventId)
    return fetch(`${config.API_ENDPOINT}/attendance`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        event_id: eventId,
        alert: "false"
      }),
    })
      .then(res =>
        (!res.ok)&&res.json().then(e => Promise.reject(e))
      )
  },
}

export default WekendApiService
