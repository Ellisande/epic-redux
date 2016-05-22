import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class MeetingList extends Component {
  render(){
    const {meetings} = this.props;
    const meetingItem = (meeting) => {
      return (
      <div className='meeting-summary' key={meeting.name}>
        <Link to={`/meeting/${meeting.name}`}>
          <span>{meeting.name}</span>&nbsp;<span>({meeting.participants})</span>
        </Link>
      </div>);
    };
    return (
      <div className='meeting-list'>
        <div className='meeting-summary'>Meetings: </div>
        {meetings.map(meetingItem)}
      </div>
    );
  }
}

const selector = state => {
  return state;
};

export default connect(selector)(MeetingList);
