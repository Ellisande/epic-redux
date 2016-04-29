import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';
import {removeTopic} from '../actions';
import BrightBox from './brightBox';

class Merge extends Component {
  constructor(props){
    super(props);
    this.deleteTopic = this.deleteTopic.bind(this);
  }
  deleteTopic(id){
    this.props.dispatch(removeTopic(id));
  }
  render(){
    const mergeTitle = (<h2>Merge</h2>);
    const mapTopics = (topic) => (
      <Topic topic={topic} key={topic.title}>
        <button className='delete' onClick={this.deleteTopic.bind(this, topic.title)}>X</button>
      </Topic>);
    return (
    <BrightBox title={mergeTitle} type='primary' className='phase'>
      {this.props.topics.map(mapTopics)}
    </BrightBox>);
  }
}

export default connect(i=>i)(Merge);
