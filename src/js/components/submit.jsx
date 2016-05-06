import React, {Component} from 'react';
import Topic from './topic';
import {connect} from 'react-redux';
import {postTopic} from '../actions';
import {dispatch} from '../services/socket';
import _ from 'lodash';
import {findUser} from '../store/utils';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.postTopic = this.post.bind(this);
    this.updatePostTopic = this.updatePostTopic.bind(this);
    this.state = {
      newTopic: undefined
    };
  }
  updatePostTopic(e) {
    const newTopic = _.get(e, 'target.value');
    this.setState({newTopic});
  }
  post(e) {
    e.preventDefault();
    if (!_.isEmpty(this.state.newTopic)) {
      dispatch(postTopic(this.state.newTopic, this.props.user.name));
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

const selector = state => {
  return {
    topics: state.topics,
    user: findUser(state)
  };
};
export default connect(selector)(Submit);
