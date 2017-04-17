import React, {Component} from 'react';
import SideBar from './sideBar';
import {connect} from 'react-redux';
import Chat from './chat';
import {connectToRoom, disconnectFromRoom} from '../services/socket';

class Meeting extends Component {
  componentWillMount(){
    return connectToRoom();
  }
  componentWillUnmount(){
    return disconnectFromRoom();
  }
  render(){
    return (
      <div className='meeting'>
        <SideBar participants={this.props.participants} />
        <Chat />
      </div>
    );
  }
}

const selector = state => {
  return {
    participants: state.participants,
  };
};
export default connect(selector)(Meeting);
