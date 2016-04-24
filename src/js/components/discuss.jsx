import React, {Component} from 'react';
import {connect} from 'react-redux';
import Topic from './topic';
import {setCurrentTopic} from '../actions';

class Discuss extends Component {
  constructor(props){
    super(props);
    this.nextTopic = this.nextTopic.bind(this);
  }
  componentDidMount(){
    if(!this.props.currentTopic){
      this.props.dispatch(setCurrentTopic(this.props.topics[0]));
    }
  }
  nextTopic(e){
    e.preventDefault();
    const currentTopicIndex = this.props.topics.indexOf(this.props.currentTopic);
    if(currentTopicIndex === this.props.topics.length - 1){
      return;
    }
    return this.props.dispatch(setCurrentTopic(this.props.topics[currentTopicIndex + 1]));
  }
  render(){
    const mapTopics = (topic) => {
      const showNext = topic.current ? (<div className='next'><a href='#' onClick={this.nextTopic}>Next</a></div>) : undefined;
      return (
        <Topic topic={topic} showVotes={true} key={topic.title}>
          {showNext}
        </Topic>);
    };
    return (
      <div className='discuss-phase'>
        {this.props.topics.map(mapTopics)}
      </div>);
  }
}

const selector = state => {
  const sortedTopics = [...state.topics].sort( (l, r) => r.votes.length - l.votes.length);
  const currentTopic = sortedTopics.find(topic => topic.current);
  return {
    topics: sortedTopics,
    currentTopic
  };
};
export default connect(selector)(Discuss);
