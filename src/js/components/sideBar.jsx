import React, {Component} from 'react';
import {Link} from 'react-router';
import BrightBox from './brightBox';
import {connect} from 'react-redux';
import {findUser} from '../store/utils';

class SideBar extends Component {
  render() {
    const userMarkup = (<div className='participant user'>
      <div className='you-are'>You are:</div>
      <div>{this.props.user.name}</div>
    </div>);
    const mapParticipants = participant => (
      <div className='participant' key={participant.name}>{participant.name}</div>
    );
    return (
      <div className='side-bar'>
        <div className='return'>
          <Link to='/'>Home</Link>
        </div>
        <BrightBox title='Hosts' type='secondary'>
          {this.props.user.host ? userMarkup : undefined}
          {this.props.hosts.map(mapParticipants)}
        </BrightBox>
        <BrightBox title='Participants' type='secondary'>
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
  const hosts = participantsExceptUser.filter(participant => participant.host);
  const participants = participantsExceptUser.filter(participant => !participant.host);
  return {
    hosts,
    participants,
    user
  };
};
export default connect(selector)(SideBar);
