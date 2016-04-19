import React, {Component} from 'react';

class TopicVotes extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const noVoteMarkup = (<button>-1</button>);
    const noVote = this.props.hasMyVote ? noVoteMarkup : undefined;
    const yesVoteMarkup = (<button onClick={this.props.upVote}>+1</button>);
    const yesVote = this.props.remainingVotes > 0 ? yesVoteMarkup : undefined;
    return (
      <div className='topic-votes'>
        {yesVote}
        {noVote}
      </div>);
  }
}

export default TopicVotes;
