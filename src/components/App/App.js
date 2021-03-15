import React, { Component } from 'react';
import Header from '../Header/Header'
import PrivateRoute from '../../Utils/PrivateRoute'
import PublicOnlyRoute from '../../Utils/PublicOnlyRoute'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import LandingPage from '../../routes/LandingPage/LandingPage'
import Dashboard from '../../routes/Dashboard/Dashboard'
import NewEvent from  '../../routes/NewEvent/NewEvent'
import EditEvent from  '../../routes/EditEvent/EditEvent'
import DeleteEvent from '../../routes/DeleteEvent/DeleteEvent'
import DayPage from '../../routes/DayPage/DayPage'
import FilterPage from '../../routes/FilterPage/FilterPage'
import FriendsPage from '../../routes/FriendsPage/FriendsPage'
import NewFriend from '../../routes/NewFriend/NewFriend'
import RsvpEvent from '../../routes/RsvpEvent/RsvpEvent'
import RsvpEventCancel from '../../routes/RsvpEventCancel/RsvpEventCancel'
import { Route, Switch } from 'react-router-dom'
import './App.css';

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }



    render() {
      return (
        <div className='App'>
          <header className='App__header'>
            <Header />
          </header>
          <main className='App__main'>
            {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
            <Switch>
              <Route
                exact
                path={'/'}
                component={LandingPage}
              />
             
              <PublicOnlyRoute
                path={'/login'}
                component={LoginPage}
              />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
                <PrivateRoute
                exact
                path={'/days'}
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path={'/new-event'}
                component={NewEvent}
              />
               <PrivateRoute
                exact
                path={'/change-event/:event_id'}
                component={EditEvent}
              />
                <PrivateRoute
                exact
                path={'/delete-event/:event_id'}
                component={DeleteEvent}
              />
              <PrivateRoute
                exact
                path={'/rsvp/:event_id'}
                component={RsvpEvent}
              />
               <PrivateRoute
                exact
                path={'/cancel-rsvp/:event_id'}
                component={RsvpEventCancel}
              />
              <PrivateRoute
                path={'/days/:day'}
                component={DayPage}
              />
               <PrivateRoute
                exact
                path={'/friend-search'}
                component={NewFriend}
              />
                <PrivateRoute
                path={'/filter'}
                component={FilterPage}
              />
                   <PrivateRoute
                path={'/friends'}
                component={FriendsPage}
              />
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </main>
        </div>
      )
    }
  }

export default App;

