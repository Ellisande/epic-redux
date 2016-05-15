import React, {Component} from 'react';
import {changePhase, deleteMeeting} from '../actions';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import {dispatch} from '../services/socket';

class Complete extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack(e){
    e.preventDefault();
    return dispatch(changePhase('discuss'));
  }
  deleteMeeting(){
    return dispatch(deleteMeeting());
  }
  render(){
    const title = (<h2>The End</h2>);
    return (
      <BrightBox type='primary' title={title} className='phase'>
        <div className='the-end'>
          This meeting is now over. There is nothing left to see here. Move along.
        </div>
        <div className='just-kidding'>
          <a href='#' className='oops' onClick={this.goBack}>
            <i className='fa fa-angle-left' />
            <span>Go Back</span>
          </a>
        </div>
        <div className='kill-it'>
          <a href='#' onClick={this.deleteMeeting}>
            <i className='fa fa-ban' />
            <span>Delete Meeting</span>
          </a>
        </div>
      </BrightBox>
    );
  }
}

export default connect(i=>i)(Complete);
