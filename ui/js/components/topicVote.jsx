import React, {Component} from 'react';

class TopicVotes extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const noVoteStyle = this.props.hasMyVote ? {visibility: 'visible'} : {visibility: 'hidden'};
    const noVoteMarkup = (<a href='#' onClick={this.props.downVote} className='vote-icon fa fa-minus-circle' style={noVoteStyle} />);
    const yesVoteStyle = this.props.remainingVotes > 0 ? {visibility: 'visible'} : {visibility: 'hidden'};
    const yesVoteMarkup = (<a href='#' onClick={this.props.upVote} className='vote-icon fa fa-plus-circle' style={yesVoteStyle} />);
    return (
      <div className='topic-votes'>
        {yesVoteMarkup}
        {noVoteMarkup}
      </div>);
  }
}

export default TopicVotes;
