import React, {Component} from 'react';
import Message from './message';
import {connect} from 'react-redux';
import {sendMessage, addParticipant, joinChat} from '../../../shared/actions';
import _ from 'lodash';
import {findUser} from '../../../shared/store/utils';
import {dispatch as socketDispatch} from '../services/socket';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: undefined,
      userName: Math.floor(Math.random() * 10000) + '',
    };
    this.postTopic = this.post.bind(this);
    this.updatePostTopic = this.updatePostTopic.bind(this);
  }
  componentDidMount() {
    this.props.setUserId(this.state.userName);
    this.props.addUser(this.state.userName);
  }
  updatePostTopic(e) {
    const newMessage = _.get(e, 'target.value');
    this.setState({newMessage});
  }
  post(e) {
    e.preventDefault();
    if (!this.props.user) {
      return;
    }
    if (!_.isEmpty(this.state.newMessage)) {
      this.props.sendMessage(this.state.newMessage, this.props.user.name);
      this.setState({newMessage: undefined});
    }
  }
  render() {
    const mapMessages = message => (<Message message={message} key={message.text}/>);
    return (
      <div className='chat'>
        <div className='chat-title'><h2>{this.props.roomName || ''}</h2></div>
        <div className='message-list'>
          {this.props.messages.map(mapMessages)}
        </div>
        <form className='chat-message' action='' noValidate onSubmit={this.postTopic}>
          <input className='bubble-text' value={this.state.newMessage} placeholder='Say something...' onChange={this.updatePostTopic}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    user: findUser(state),
    roomName: 'Epic Chat',
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (newMessage, userName) => socketDispatch(sendMessage(newMessage, userName)),
  addUser: userName => socketDispatch(addParticipant({id: userName, name: userName})),
  setUserId: userId => dispatch(joinChat({userId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
