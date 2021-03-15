import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App/App'
import { EventsProvider } from './contexts/EventsContext'
import { FriendsProvider } from './contexts/FriendsContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare,
  faPlus,
  faMinus,
  faSkull,
  faCheckCircle,
  faCircle,
  faCashRegister,
  faChevronRight,
  faChevronDown,
  faTimes,
  faCommentAlt,
  faMoon
} from '@fortawesome/free-solid-svg-icons'

library.add(fab,
  faCheckSquare,
  faMinus,
  faPlus,
  faSkull,
  faTimes,
  faCircle,
  faCheckCircle,
  faCashRegister,
  faChevronRight,
  faChevronDown,
  faCommentAlt,
  faMoon)


ReactDOM.render(
  <BrowserRouter>
    <EventsProvider>
      <FriendsProvider>
        <App />
      </FriendsProvider>
    </EventsProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
