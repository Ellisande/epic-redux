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
    if (!_.isEmpty(newTopic)) {
      this.setState({newTopic});
    }
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
        <form action='' noValidate onSubmit={this.postTopic}>
          <input value={this.state.newTopic} placeholder='Post a Topic' onChange={this.updatePostTopic}/>
          <button className='post-topic' type='submit'>Speak Up!</button>
        </form>
        <div className='topic-list'>
          {this.props.topics.map(mapTopics)}
        </div>
      </div>
    );
  }
}

export default connect(i => i)(Submit);
