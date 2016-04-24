import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';
import {removeTopic} from '../actions';

class Merge extends Component {
  constructor(props){
    super(props);
    this.deleteTopic = this.deleteTopic.bind(this);
  }
  deleteTopic(id){
    this.props.dispatch(removeTopic(id));
  }
  render(){
    const mapTopics = (topic) => (
      <Topic topic={topic} key={topic.title}>
        <button className='delete' onClick={this.deleteTopic.bind(this, topic.title)}>X</button>
      </Topic>);
    return (
    <div className='merge'>
      {this.props.topics.map(mapTopics)}
    </div>);
  }
}

export default connect(i=>i)(Merge);
