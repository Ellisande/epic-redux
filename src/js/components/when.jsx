import React, {Component} from 'react';

class When extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='when'>
        <div className='main-subtitle'>
          <h2>When to Use It</h2>
        </div>
        <div className='when-copy'>
            Note and Vote works best for meetings without a set agenda,
            such as catching up with your team, or idea generation.
            It can also be useful for more structured meetings that need
            to be time-boxed.
        </div>
      </div>);
  }
}

export default When;
