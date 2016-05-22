import React, {Component} from 'react';

class WhatsNew extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='how'>
        <div className='main-subtitle'><h2>Lock and Knock</h2></div>
        <div className='how-steps'>
          Good news everybody! You can now lock meetings! If you try to enter a locked meeting (and they've opted to allow knocking) you'll be given a chance to type a message to the host. Based on that message they'll decide whether or not to let you in.
        </div>
      </div>);
  }
}

export default WhatsNew;
