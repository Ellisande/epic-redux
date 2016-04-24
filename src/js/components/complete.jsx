import React, {Component} from 'react';
import {changePhase} from '../actions';
import {connect} from 'react-redux';

class Complete extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack(e){
    e.preventDefault();
    return this.props.dispatch(changePhase('discuss'));
  }
  render(){
    return (
      <div className='complete'>
        <div className='description'>
          This meeting is now over. There is nothing left to see here. Move along.
        </div>
        <div className='oops'>
          Didn't mean to end the meeting? <a href='#' onClick={this.goBack}>Go Back</a>
        </div>
      </div>);
  }
}

export default connect(i=>i)(Complete);
