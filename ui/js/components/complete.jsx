import React, {Component} from 'react';
import {changePhase, deleteMeeting} from '../../../shared/actions';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import BrightButton from './brightButton';
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
        <div className='complete-actions'>
          <BrightButton type='secondary' icon='fa-angle-left' onClick={this.goBack}>
            Back
          </BrightButton>
          <BrightButton type='tertiary' icon='fa-trash' onClick={this.deleteMeeting}>
            Delete Meeting
          </BrightButton>
        </div>
      </BrightBox>
    );
  }
}

export default connect(i=>i)(Complete);
