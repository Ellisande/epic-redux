import React, {Component} from 'react';
import {removeTopic, upVote, downVote} from '../actions';
import {connect} from 'react-redux';
import TopicVotes from './topic-vote';
import _ from 'lodash';
class Topic extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }
  remove(dispatch, id){
    dispatch(removeTopic(id));
  }
  upVote(){
    this.props.dispatch(upVote(this.props.topic, this.props.user));
  }
  downVote(){
    this.props.dispatch(downVote(this.props.topic, this.props.user));
  }
  render(){
    const hasMyVote = this.props.topic.votes.filter(voter => voter === this.props.me).length;
    const deleteMarkup = (<button className='delete' onClick={this.remove.bind(this, this.props.topic.title)}>X</button>);
    const getDelete = this.props.delete ? deleteMarkup : undefined;
    const votingMarkup = (<TopicVotes hasMyVote={hasMyVote} remainingVotes={this.props.remainingVotes} upVote={this.upVote} downVote={this.downVote}/>);
    const showVotingButtons = this.props.vote ? votingMarkup : undefined;
    const showVotingTotal = this.props.vote || this.props.showVotes ? (<div className='vote-total'>{this.props.topic.votes.length}</div>) : undefined;
    const currentClass = this.props.topic.current ? 'current' : '';
    const showNextTopic = this.props.nextTopic ? (<div className='next'>Next</div>) : undefined;
    return (
      <div className={`topic ${currentClass}`}>
        {showVotingTotal}
        <div className='topic-body'>
          <div className='title'>{this.props.topic.title}</div>
          <div className='by-line'>{this.props.topic.by}</div>
        </div>
        <div className='actions'>
          {getDelete}
          {showVotingButtons}
          {showNextTopic}
          {this.props.children}
        </div>
      </div>
    );
  }
}

const selector = state => {
  const me = state.user.name;
  const allVotes = _.map(state.topics, 'votes');
  const myVotes = allVotes.reduce((accum, votes) => [...accum, ...votes]).filter(voter => voter === me);
  const remainingVotes = 3 - (myVotes.length || 0);
  return Object.assign({}, state, {allVotes, myVotes, remainingVotes, me});
};

export default connect(selector)(Topic);
