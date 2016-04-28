import React, {Component} from 'react';
import {Link} from 'react-router';

class SideBar extends Component {
  render() {
    const participants = participant => (
      <div className='participant' key={participant.name}>{participant.name}</div>
    );
    return (
      <div className='side-bar'>
        <div className='return'>
          <Link to='/'>Home</Link>
        </div>
        <div className='participants'>
          <div className='side-header'>Participants</div>
          <div className='participant'>The Mighty</div>
          {this.props.participants.map(participants)}
        </div>
      </div>
    );
  }
}

export default SideBar;
