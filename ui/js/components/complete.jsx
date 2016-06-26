import React, {Component} from 'react';
import {changePhase, deleteMeeting} from '../../../shared/actions';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import BrightButton from './brightButton';
import {dispatch} from '../services/socket';
import {isUserHost} from '../../../shared/store/utils';

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
    const showActions = this.props.isHost ? {} : {display: 'none'};
    const showCopy = !this.props.isHost ? {} : {display: 'none'};
    return (
      <BrightBox type='primary' title={title} className='phase'>
        <div>
          <div className='complete-actions' style={showActions}>
            <BrightButton type='secondary' icon='fa-angle-left' onClick={this.goBack}>
              Back
            </BrightButton>
            <BrightButton type='tertiary' icon='fa-trash' onClick={this.deleteMeeting}>
              Delete Meeting
            </BrightButton>
          </div>
          <div className='the-end' style={showCopy}>
            The meeting is over. There is nothing else to do. Have a nice day!
          </div>
        </div>
      </BrightBox>
    );
  }
}

const selector = state => {
  return {
    isHost: isUserHost(state)
  };
};
export default connect(selector)(Complete);
