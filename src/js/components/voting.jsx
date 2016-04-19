import React, {Component} from 'react';
import {connect} from 'react-redux';
import Topic from './topic';

class Voting extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const mapTopics = topic => (
      <Topic topic={topic} vote={true} key={topic.title} />
    );
    return (
      <div className='voting'>
        {this.props.topics.map(mapTopics)}
      </div>);
  }
}

export default connect(i=>i)(Voting);
