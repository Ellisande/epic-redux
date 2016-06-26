import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';
import {removeTopic} from '../../../shared/actions';
import BrightBox from './brightBox';
import {dispatch} from '../services/socket';
import {isUserHost} from '../../../shared/store/utils';

class Merge extends Component {
  constructor(props){
    super(props);
    this.deleteTopic = this.deleteTopic.bind(this);
  }
  deleteTopic(id){
    dispatch(removeTopic(id));
  }
  render(){
    const showActions = this.props.isHost ? {} : {display: 'none'};
    const mergeTitle = (<h2>Merge</h2>);
    const mapTopics = (topic) => (
      <Topic topic={topic} key={topic.title}>
        <a href='#' className='delete' onClick={this.deleteTopic.bind(this, topic.title)} style={showActions}>
          <i className='fa fa-trash-o' aria-hidden='true'></i>
        </a>
      </Topic>);
    return (
      <BrightBox title={mergeTitle} type='primary' className='merge'>
        {this.props.topics.map(mapTopics)}
      </BrightBox>);
  }
}

const selector = state => {
  return {
    isHost: isUserHost(state),
    topics: state.topics
  }
}
export default connect(selector)(Merge);
