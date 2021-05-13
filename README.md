# WEkend🌴

A social app for posting casual weekend events and activities for your friends to see.

This repo is the front-end client, built-in React. You can see the app live at [https://wekend-client-ozharb.vercel.app/]

The app is meant for mobile use, but scales for desktop viewing.

To check out the app, I suggest you use the demo account using the credentials below as well as create your own account to experience the registration process.

#### Demo Account Details

- user name: Demo
- password: Demo2021!

## Introduction

WEkend is a friendly weekend planning app for friends. Connect with friends, post events, and see what others are up to.

Simple, quick, and awesome.

### User Stories

- User can:
  - Register for a new account
  - Log in to their own secure account
  - See their dashboard (Dayboard)
  - Pick a day of the weekend to view
  - See all events the user and the user's friends posted
  - See event details including who's attending the event
  - Get notified when an event has changed.
  - See if others attending an event have not seen the update (explained in 'App Features' section)
  - Edit or delete events the user posted
  - Rsvp or delete Rsvp for events others posted
  - Search for friends by searching username or full name or knickname
  - Send other app users a friend request
  - View all friends in their friends page
  - See confirmed friends
  - See pending friends including resquests send and received
  - Accept or delete or cancel confirmed and pending friendships
  - Filter events by specific friends
  - Get a link to a how-to guide in the app

## App Features

### See all the events you and your friends posted and get notified when any details change.

<p align="center">
<img src="src/routes/LandingPage/images/yoga.png" width="300">
</p>
 See if an event detail has changed after you've RSPVed to be sure you're up to date with the latest info. Like in the screenshot above, the event 'yoga' is marked in red. This means you've RSVP-ed to an event, a detail about that event has changed, and you haven't opened up the event since. Once you open up the event, the event name will no longer be red.

### Get all the important info you need in one place, including who's going to which events and who didn't see an update.

<p align="center">
<img src="src/routes/LandingPage/images/yoga-mary.png" width="300">
</p>
Like in the screenshot above where the name Mary is marked in red, Mary RSVP-ed to an event then the host changed some detail about the event, and Mary hasn't opened up the event since the update. Once Mary opens up the event again, her name will no longer be red.

### Send and accept friend requests to connect with others.

<p align="center">
<img src="src/routes/LandingPage/images/friends-page.png" width="300">
</p>
Using a built in search feature, you can easily find other users by search their user name, nickname, or full name. Send them a friend request and see the request pending on your friends pages until the accept. Once accepted, you can see all of eachothers events.

### Filter the events you see by who's hosting them

<p align="center">
<img src="src/routes/LandingPage/images/friends-filter.png" width="300">
</p>
Get a precise look at what's going on this weekend by using filters. Turn on all your friends' filters to just get your events. Or keep them all off and know what everyone's doing for the ultimate weekend!

## Technology

#### Front End

- React
  - Create React App
  - React Router
- HTML5
- CSS3 (scratch - no frameworks)

#### Testing

- Jest (screen captures & smoke tests)

#### Production

- Deployed via Vercel
