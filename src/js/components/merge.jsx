import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';

class Merge extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const mapTopics = (topic) => (<Topic topic={topic} delete={true} key={topic.title}/>);
    return (
    <div className='merge'>
      {this.props.topics.map(mapTopics)}
    </div>);
  }
}

export default connect(i=>i)(Merge);
