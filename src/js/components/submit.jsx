import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';
import {postTopic} from '../actions';
import _ from 'lodash';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.postTopic = this.post.bind(this, props.dispatch);
    this.updatePostTopic = this.updatePostTopic.bind(this);
    this.state = {
      newTopic: undefined
    };
  }
  updatePostTopic(e) {
    const newTopic = _.get(e, 'target.value');
    this.setState({newTopic});
  }
  post(dispatch, e) {
    e.preventDefault();
    if (!_.isEmpty(this.state.newTopic)) {
      dispatch(postTopic(this.state.newTopic, 'Mayor McCheese'));
      this.setState({newTopic: undefined});
    }
  }
  render() {
    const mapTopics = topic => (<Topic topic={topic} key={topic.title}/>);
    return (
      <div className='submit'>
        <div className='submit-title'><h2>Post a Topic</h2></div>
        <form className='submit-topic' action='' noValidate onSubmit={this.postTopic}>
          <input className='bubble-text' value={this.state.newTopic} placeholder='Speak Up' onChange={this.updatePostTopic}/>
        </form>
        <div className='topic-list'>
          {this.props.topics.map(mapTopics)}
        </div>
      </div>
    );
  }
}

export default connect(i => i)(Submit);
