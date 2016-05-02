import React, {Component} from 'react';
import {Link} from 'react-router';
import BrightBox from './brightBox';
import {connect} from 'react-redux';

class SideBar extends Component {
  render() {
    const mapParticipants = participant => (
      <div className='participant' key={participant.name}>{participant.name}</div>
    );
    return (
      <div className='side-bar'>
        <div className='return'>
          <Link to='/'>Home</Link>
        </div>
        <BrightBox title='Hosts' type='secondary'>
          {this.props.hosts.map(mapParticipants)}
        </BrightBox>
        <BrightBox title='Participants' type='secondary'>
          <div className='participant'>The Mighty</div>
          {this.props.participants.map(mapParticipants)}
        </BrightBox>
      </div>
    );
  }
}

const selector = state => {
  return {
    hosts: state.participants.filter(participant => participant.host),
    participants: state.participants.filter(participant => !participant.host)
  };
};
export default connect(selector)(SideBar);
