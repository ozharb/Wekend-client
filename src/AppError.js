import React from 'react'

export default class ApiError extends React.Component {
    state = {error: null};
      
      static getDerivedStateFromError(error) {
        return { error };
      }
    render(){
        if (this.state.hasError) {      
            return (
              <h2>Oops, something went wrong. Please navigate back home.</h2>
            );
          }
          return this.props.children;
}
}