import React, {Component} from 'react';
import {connect} from 'react-redux';
import Topic from './topic';
import TopicVotes from './topicVote';
import BrightBox from './brightBox';
import {upVote, downVote} from '../actions';
import _ from 'lodash';


class Voting extends Component {
  constructor(props){
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }
  upVote(topic){
    this.props.dispatch(upVote(topic, this.props.user));
  }
  downVote(topic){
    this.props.dispatch(downVote(topic, this.props.user));
  }
  render(){
    const hasMyVote = topic => topic.votes.filter(voter => voter === this.props.me).length;
    const mapTopics = topic => (
      <Topic topic={topic} key={topic.title} showVotes={true} >
        <TopicVotes hasMyVote={hasMyVote(topic)} remainingVotes={this.props.remainingVotes} upVote={this.upVote.bind(this, topic)} downVote={this.downVote.bind(this, topic)}/>
      </Topic>
    );
    const title = (
      <div className='vote-title'>
        <h2>Vote</h2>
        <div className='votes-remaining'>{this.props.remainingVotes} votes remaining</div>
      </div>
    );
    return (
      <BrightBox type='primary' title={title} className='phase'>
        {this.props.topics.map(mapTopics)}
      </BrightBox>);
  }
}

const selector = state => {
  const me = state.user.name;
  const allVotes = _.map(state.topics, 'votes');
  const myVotes = allVotes.reduce((accum, votes) => [...accum, ...votes]).filter(voter => voter === me);
  const remainingVotes = 3 - (myVotes.length || 0);
  return Object.assign({}, state, {allVotes, myVotes, remainingVotes, me});
};

export default connect(selector)(Voting);
