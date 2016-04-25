import React, {Component} from 'react';

class How extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='how'>
        <div className='main-subtitle'><h2>How it Works</h2></div>
        <div className='how-steps'>
          <div className='how-step'>1. Post Your Ideas</div>
          <div className='how-step'>2. Removed Duplicates</div>
          <div className='how-step'>3. Vote for the Best</div>
          <div className='how-step'>4. Discuss in Order</div>
          <div className='how-step'>5. Stop When You Run Out of Time</div>
        </div>
      </div>);
  }
}

export default How;
