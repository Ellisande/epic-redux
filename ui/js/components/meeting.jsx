import React, {Component} from 'react';
import SideBar from './sideBar';
import {connect} from 'react-redux';
import Submit from './submit';
import {connectToRoom, disconnectFromRoom} from '../services/socket';

class Meeting extends Component {
  componentWillMount(){
    return connectToRoom(this.props.params.meetingName);
  }
  componentWillUnmount(){
    return disconnectFromRoom();
  }
  render(){
    return (
      <div className='meeting'>
        <SideBar participants={this.props.participants} />
        <Submit />
      </div>
    );
  }
}

const selector = state => {
  return {
    participants: state.participants,
    roomName: 'room1',
  };
};
export default connect(selector)(Meeting);
