// Logo.js
import React, { Component } from 'react'
import "./Logo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReMount = props => {
    let [key, setKey] = React.useState(0);
  const handleKey = () => setKey(Date.now())
    return (
      <div>
      <button className="reload" onClick={handleKey}>
        <div key={key} >{props.children}</div>
         
        </button>
      </div>
    );
  };
class Logo extends Component {
    // state = {
    //     expand: true
    //   }
 
    render(){
     
        return(
           <>
 <ReMount >
      <div className="diffcircle" >
          <div className="circle-overlay" /> 

       <div className="circle-fill"  /> 
       <i className="fas fa-moon"><FontAwesomeIcon className='moon' icon='moon' /></i>

    </div>
    </ReMount>
</>

        )
    }
}


export default Logo;