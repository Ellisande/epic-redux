import React, {Component} from 'react';
import {removeTopic, upVote} from '../actions';
import {connect} from 'react-redux';
import TopicVotes from './topic-vote';
import _ from 'lodash';
class Topic extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this, props.dispatch);
    this.upVote = this.upVote.bind(this, props.dispatch);
  }
  remove(dispatch, id){
    dispatch(removeTopic(id));
  }
  upVote(dispatch){
    dispatch(upVote(this.props.topic, this.props.user));
  }
  render(){
    // console.log(this.props);
    const hasMyVote = this.props.topic.votes.filter(voter => voter === this.props.me).length;
    const deleteMarkup = (<button className='delete' onClick={this.remove.bind(this, this.props.topic.title)}>X</button>);
    const getDelete = this.props.delete ? deleteMarkup : undefined;
    const votingMarkup = (<TopicVotes hasMyVote={hasMyVote} remainingVotes={this.props.remainingVotes} upVote={this.upVote} />);
    const showVotingButtons = this.props.vote ? votingMarkup : undefined;
    const showVotingTotal = this.props.vote ? (<div className='vote-total'>{this.props.topic.votes.length}</div>) : undefined;
    return (
      <div className='topic'>
        {showVotingTotal}
        <div className='topic-body'>
          <div className='title'>{this.props.topic.title}</div>
          <div className='by-line'>{this.props.topic.by}</div>
        </div>
        <div className='actions'>
          {getDelete}
          {showVotingButtons}
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
