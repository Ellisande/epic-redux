import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {filterMeetings} from '../../../shared/actions';

class MeetingList extends Component {
  componentWillMount(){
    const filterAction = filterMeetings();
    this.props.dispatch(filterAction);
  }
  render(){
    const {meetings} = this.props;
    const filteredMeetings = meetings.filter(meeting => {
      const filter = this.props.meetingFilter;
      if(filter){
        return meeting.name.startsWith(filter);
      }
      else {
        return true;
      }
    });
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
        {filteredMeetings.map(meetingItem)}
      </div>
    );
  }
}

const selector = state => {
  return state;
};

export default connect(selector)(MeetingList);
