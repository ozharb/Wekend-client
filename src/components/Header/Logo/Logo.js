// Logo.js
import React, { Component } from 'react'
import "./Logo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ReMount = props => {
    let [key, setKey] = React.useState(0);
  const handleKey = () => setKey(Date.now())
    return (
      
      <button 
      className="reload" 
      onClick={handleKey}
      aria-label="main-menu">
        <div  
        key={key} className='inside-reload'>{props.children}</div>
         
        </button>

    );
  };
class Logo extends Component {

 
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