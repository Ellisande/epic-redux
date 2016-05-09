import React, {Component} from 'react';

class Safety extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='how'>
        <div className='main-subtitle'><h2>Is It Safe?</h2></div>
        <div className='how-steps'>
          No information is permanently saved. When you are done with the meeting all the inforamtion is cleaned up. We don't store the information, or even look at it. Additional security features like locking a room are on the way.
        </div>
      </div>);
  }
}

export default Safety;
