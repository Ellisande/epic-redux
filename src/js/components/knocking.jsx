import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';

class Knocking extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const title = (
      <div className='discuss-title'>
        <h2>Locked Out</h2>
      </div>);
    return (
      <BrightBox type='primary' title={title} className='phase'>
        <div className='locked-out'>
          This meeting is currently locked and you cannot join.
        </div>
      </BrightBox>
    );
  }
}

const selector = state => {
  return {
    lockedOut: state.lockedOut
  };
};
export default connect(selector)(Knocking);
