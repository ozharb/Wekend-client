import React, { Component } from 'react'
import EventsContext from '../../contexts/EventsContext'
import WekendApiService from '../../services/Wekend-api-service'
import { Input, Required } from '../../Utils/Utils'
import FoundUser from '../../components/FoundUser/FoundUser'
import AppForm from '../../Utils/AppForm'
import './NewFriend.css'

export default class NewFriend extends Component {
  state = {
    name: { value: '', touched: false },
    results: [],
    submitted: false,
    requested: false
};
setName = name => {
    this.setState({ name: { value: name, touched: true } }); // Switch touched to true
};
setRequested = ()=>{
  this.setState({requested: true})
}
validateName = () => {
    let name = this.state.name.value;

    if (name.length <= 0) {

        return "Who we looking for?";
    }
}

  static contextType = EventsContext


  handleSearch = e => {
    e.preventDefault()

    const  nameSearch = e.target['name'].value


  console.log('nameSearch:',nameSearch )
    WekendApiService.findFriend(nameSearch)
  
      .then((results) => {
        this.setState({results: results})
        this.setState({submitted: true})
       
      })
      .catch(this.context.setError)
  }
  renderResults() {
    const {results} = this.state 
  
    return (!results.length) ?<>
     <p>Looks like there's nobody by that name 'round these parts.</p>
    <p>I reckon you should check your spelling and try again.</p>
    <p>Or...send your friend a link and tell 'em to sign up'.</p>
    </>
    : results.map((user, i) =>
      <FoundUser
        submitRequest={this.setRequested}
        key={user.id + i}
        user={user}
      />
    )
  }
  render() {
    return (
      <section className='add-event-form'>
                <h3>Find Your friend</h3>
                {this.state.requested ? <h3 className ='posted-event'>Request Requested!</h3>:
                <form onSubmit={this.handleSearch}>
                    <label htmlFor='Event-title-input'>
                        Search name: <Required />

                        {<p className="error">{this.validateName()}</p>}
                    </label>
                    <Input type='text' id='event-title-input' name='name'
                        value={this.state.name.value}
                        onChange={e => this.setName(e.target.value)} />
                 
                    <button className='done-add-event' type="submit" disabled={this.validateName()}>Search</button>

                </form>
  }
 {this.state.submitted && this.renderResults()}
            </section>
    )
  }
}
