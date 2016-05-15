import React, {Component} from 'react';
import SideBar from './sideBar';
import PhaseControls from './phaseControls';
import {connect} from 'react-redux';
import Submit from './submit';
import Merge from './merge';
import Voting from './voting';
import Discuss from './discuss';
import Complete from './complete';
import Knocking from './knocking';
import {connectToRoom, disconnectFromRoom} from '../services/socket';

class Meeting extends Component {
  componentWillMount(){
    return connectToRoom(this.props.params.meetingName);
  }
  componentWillUnmount(){
    return disconnectFromRoom();
  }
  render(){
    const phaseMap = {
      submit: (<Submit />),
      merge: (<Merge />),
      vote: (<Voting />),
      discuss: (<Discuss />),
      complete: (<Complete />)
    };
    const lockedOut = this.props.lockedOut ? (<Knocking />) : undefined;
    const currentPhase = phaseMap[this.props.phase];
    return (
      <div className='meeting'>
        <SideBar participants={this.props.participants} />
        {lockedOut || currentPhase}
        <PhaseControls />
      </div>
    );
  }
}

const selector = state => {
  return {
    lockedOut: state.lockedOut,
    phase: state.phase,
    participants: state.participants
  };
};
export default connect(selector)(Meeting);
