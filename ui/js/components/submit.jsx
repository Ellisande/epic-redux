import React, {Component} from 'react';
import Message from './message';
import {connect} from 'react-redux';
import {sendMessage} from '../../../shared/actions';
import {dispatch} from '../services/socket';
import _ from 'lodash';
import {findUser} from '../../../shared/store/utils';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.postTopic = this.post.bind(this);
    this.updatePostTopic = this.updatePostTopic.bind(this);
    this.state = {
      newMessage: undefined
    };
  }
  updatePostTopic(e) {
    const newMessage = _.get(e, 'target.value');
    this.setState({newMessage});
  }
  post(e) {
    e.preventDefault();
    if (!_.isEmpty(this.state.newMessage)) {
      dispatch(sendMessage(this.state.newMessage, this.props.user.name));
      this.setState({newMessage: undefined});
    }
  }
  render() {
    const mapMessages = message => (<Message message={message} key={message.text}/>);
    return (
      <div className='submit'>
        <div className='submit-title'><h2>{this.props.roomName || ''}</h2></div>
        <div className='message-list'>
          {this.props.messages.map(mapMessages)}
        </div>
        <form className='submit-message' action='' noValidate onSubmit={this.postTopic}>
          <input className='bubble-text' value={this.state.newMessage} placeholder='Speak Up' onChange={this.updatePostTopic}/>
        </form>
      </div>
    );
  }
}

const selector = state => {
  return {
    messages: state.messages,
    user: findUser(state),
    roomName: 'Epic Chat',
  };
};
export default connect(selector)(Submit);
