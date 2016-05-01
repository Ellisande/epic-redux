import React, {Component} from 'react';

class Topic extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const showVotingTotal = this.props.showVotes ? (<div className='vote-total'>{this.props.topic.votes.length}</div>) : undefined;
    const currentClass = this.props.topic.current ? 'current' : '';
    return (
      <div className={`topic ${currentClass}`}>
        {showVotingTotal}
        <div className='topic-body'>
          <div className='topic-title'>{this.props.topic.title}</div>
          <div className='by-line'>Posted By: {this.props.topic.by}</div>
        </div>
        <div className='topic-actions'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Topic;
