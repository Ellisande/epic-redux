import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory, Link} from 'react-router';
import {connectToMeetings, disconnectFromMeetings} from '../services/socket';

class App extends Component {
  constructor(props){
    super(props);
    this.createMeeting = this.createMeeting.bind(this);
    this.updateMeetingName = this.updateMeetingName.bind(this);
    this.setActive = this.setActive.bind(this);
    this.goToMeetings = this.goToMeetings.bind(this);
    this.state = {
      newMeetingName: undefined
    };
  }
  componentWillMount(){
    return connectToMeetings();
  }
  componentWillUnmount(){
    return disconnectFromMeetings();
  }
  createMeeting(e){
    e.preventDefault();
    return browserHistory.push(`/meeting/${this.state.newMeetingName}`);
  }
  updateMeetingName(e){
    const newMeetingName = e.target.value;
    const newState = Object.assign({}, this.state, {newMeetingName});
    return this.setState(newState);
  }
  goToMeetings(){
    this.setState(Object.assign({}, this.state, {active: undefined}));
    return browserHistory.push('/');
  }
  setActive(activeTab){
    return this.setState(Object.assign({}, this.state, {active: activeTab}));
  }
  render(){
    const isActive = tabName => this.state.active === tabName ? 'active' : '';
    return (
      <main className='home'>
        <section className='light-box'>
          <div className='upper-box'>
            <div className='icon fa fa-sticky-note-o logo'></div>
            <div className='title'>Note & Vote</div>
            <div className='description-list'>
              <Link to='/how' className={isActive('how')} onClick={this.setActive.bind(this, 'how')}>How</Link>
              <Link to='/when' className={isActive('when')} onClick={this.setActive.bind(this, 'when')}>When</Link>
              <Link to='/safety' className={isActive('safety')} onClick={this.setActive.bind(this, 'safety')}>Safety</Link>
            </div>
          </div>
          <div className='middle-box'>
            <form onSubmit={this.createMeeting}>
              <input
                className='bubble-text'
                placeholder='Meeting Name'
                autoFocus
                onChange={this.updateMeetingName}
                onFocus={this.goToMeetings}/>
            </form>
          </div>
          <div className='lower-box'>
            {this.props.children}
          </div>
        </section>
      </main>);
  }
}

const selector = state => state;

export default connect(selector)(App);
