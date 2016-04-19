import React, {Component} from 'react';
import MeetingList from './meetingList';
import {connect} from 'react-redux';
import {createMeeting} from '../actions';
import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props){
    super(props);
    this.createMeeting = this.createMeeting.bind(this, props.dispatch);
    this.updateMeetingName = this.updateMeetingName.bind(this);
    this.state = {
      newMeetingName: undefined
    };
  }
  createMeeting(dispatch, e){
    e.preventDefault();
    dispatch(createMeeting(this.state.newMeetingName));
    return browserHistory.push(`/meeting/${this.state.newMeetingName}`);
  }
  updateMeetingName(e){
    this.setState({
      newMeetingName: e.target.value
    });
  }
  render(){
    return (
        <div className='home'>
          <MeetingList />
          <div className='splash'>
            <div className='welcome'>
              Welcome to Note & Vote
            </div>
          </div>
          <div className='steps'>How Does It Work?</div>
          <div className='when'>When should I use it?</div>
          <div className='security'>Is it safe?</div>
          <div className='get-started'>
            <div className='explanation'>
              Find a meeting
            </div>
            <div className='meeting-search'>
              <form noValidate action='' onSubmit={this.createMeeting}>
                <input placeholder='Best Meeting Ever' onChange={this.updateMeetingName}/>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

const selector = state => state;

export default connect(selector)(App);
