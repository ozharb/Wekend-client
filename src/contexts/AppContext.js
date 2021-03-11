// import React, { Component} from 'react'

// const AppContext = React.createContext({
//   user: '',
//   handleLoggedOut: ()=>{},
//   handleLoggedIn: ()=>{},
//   saveUsername: () => {},

// })

// export default AppContext

// export class AppProvider extends Component {
//   state = { user: ''}

// render() {
//   const value = {
//     loggedIn: this.state.loggedIn,
//     user: this.state.user,
//     handleLoggedOut: this.handleLoggedOut,
//     handleLoggedIn: this.handleLoggedIn,
//     saveUsername: this.saveUsername
//   };
//   return (
//     <AppContext.Provider value={value}>
//     {this.props.children}
//   </AppContext.Provider>
//   )
// }

// }