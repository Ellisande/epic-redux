import React, {Component} from 'react';
import BrightBox from './brightBox';
import {connect} from 'react-redux';
import {findUser} from '../../../shared/store/utils';

class SideBar extends Component {
  render() {
    const userMarkup = (<div className='participant user'>
      <div className='you-are'>You are:</div>
      <div>{this.props.user.name}</div>
    </div>);
    const mapParticipants = participant => (
      <div className='participant' key={participant.name}>{participant.name}</div>
    );
    const show = !this.props.lockedOut ? undefined : {display: 'none'};
    return (
      <div className='side-bar'>
        <BrightBox title='Participants' type='secondary' emptyState='No Regular Participants' style={show}>
          {!this.props.user.host ? userMarkup : undefined}
          {this.props.participants.map(mapParticipants)}
        </BrightBox>
      </div>
    );
  }
}

const selector = state => {
  const user = findUser(state) || {};
  const participantsExceptUser = state.participants.filter(p => p.id !== state.userId);
  const participants = participantsExceptUser.filter(participant => !participant.host);
  return {
    participants,
    user,
  };
};
export default connect(selector)(SideBar);
