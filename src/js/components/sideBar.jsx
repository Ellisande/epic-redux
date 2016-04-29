import React, {Component} from 'react';
import {Link} from 'react-router';
import BrightBox from './brightBox';

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
        <BrightBox title='Participants' type='secondary'>
          <div className='participant'>The Mighty</div>
          {this.props.participants.map(participants)}
        </BrightBox>
      </div>
    );
  }
}

export default SideBar;
