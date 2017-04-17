import React, {Component} from 'react';

class message extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='message'>
        <div className='message-body'>
          <div className='by-line'>{this.props.message.by}:</div>
          <div className='message-title'>{this.props.message.text}</div>
        </div>
        <div className='message-actions'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default message;
