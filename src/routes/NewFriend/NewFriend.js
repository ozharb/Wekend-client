import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import { Input, Required } from '../../Utils/Utils'
import FoundUser from '../../components/FoundUser/FoundUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NewFriend.css'

export default class NewFriend extends Component {
  state = {
    name: { value: '', touched: false },
    results: [],
    submitted: false,
    requested: false,
    loading: false
};
setName = name => {
    this.setState({ name: { value: name, touched: true } }); // Switch touched to true
};
setRequested = ()=>{
  this.setState({requested: true})
}
setLoading = (trueOrFalse) =>{
  this.setState({loading: trueOrFalse})
}
validateName = () => {
    let name = this.state.name.value;

    if (name.length <= 0) {

        return "Who we looking for?";
    }
}

  static contextType = EventsContext
  handleCancel = e =>{
    e.preventDefault()
    this.props.history.goBack()
  }

  handleSearch = e => {
    e.preventDefault()
    this.setLoading(true)
    this.setState({submitted: true})
this.setState({results: []})
    const  nameSearch = e.target['name'].value

    WekendApiService.findFriend(nameSearch)
  
      .then((results) => {
     
        this.setState({results: results})
        
          this.setLoading(false)
      })
      .catch(this.context.setError)
  }
  renderResults() {
    const {results} = this.state 
  
    return (!results.length) ?
    <article className = 'no-results'>
     <p>Looks like there's nobody by that name 'round these parts.</p>
    <p>I reckon you should check your spelling and try again partner.</p>
    <p>Or...send your friend a link and tell 'em to sign up.</p>
    </article>
    : results.map((user, i) =>
      <FoundUser
        history={this.props.history}
        submitRequest={this.setRequested}
        key={user.id + i}
        user={user}
      />
    )
  }
  render() {
    return (
      <section className='new-friend-page'>
              
                {this.state.requested ? <h3 className ='posted-event requested'>Request <br/>Requested!</h3>:
                <fieldset className='friend-search-form'>
                  <legend><h3>Find a friend</h3></legend>
                <form onSubmit={this.handleSearch}
                onCancel = {this.handleCancel}>
                    <label htmlFor='search-name-input'>
                        Search name: <Required />
                        {<p className="error">{this.validateName()}</p>}
                    </label>
                    <Input type='text' id='search-name-input' name='name'
                        value={this.state.name.value}
                        onChange={e => this.setName(e.target.value)} />
                 
                    <button className='search-friend' type="submit" disabled={this.validateName()}>Search</button>
                    <button className='search-friend cancel' onClick = {this.handleCancel} type='cancel'>Nevermind</button>
                </form>
   </fieldset>              
 }

 {(this.state.submitted && !this.state.requested) && 
 <section className='friend-search-results'>

 {   this.state.loading
                ?     <div className='loader-container'>
                <div className='Loader'>
                <div className="loader-circle-overlay"  > 
                <i className="fas fa-moon small-moon"><FontAwesomeIcon className='small-moon' icon='moon' /></i>
                </div>
                    </div>
                    </div>
            : 
            <article className='results'>
                <h2>Results</h2> 
            {this.renderResults()}
            </article>
            }
 </section>}
            </section>
    )
  }
}
