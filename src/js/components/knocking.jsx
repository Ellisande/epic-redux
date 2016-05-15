import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';

class Knocking extends Component {
  constructor(props){
    super(props);
    this.state = {
      knockMessage: '',
      knocked: false
    };
    this.knock = this.knock.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }
  updateMessage(e){
    const newState = Object.assign({}, this.state, {knockMessage: e.target.value});
    this.setState(newState);
  }
  knock(e){
    e.preventDefault();
    const newState = Object.assign({}, this.state, {knocked: true, knockMessage: ''});
    this.setState(newState);
  }
  render(){
    const title = (
      <div className='discuss-title'>
        <h2>Locked Out</h2>
      </div>);
    const bubble = !this.state.knocked ? (
      <div className='knock-form bubble-text'>
        <input className='knock-text' value={this.state.knockMessage} placeholder='Name or password' onChange={this.updateMessage}/>
        <button type='submit' className='knock-button fa fa-unlock-alt' />
      </div>
    ) : (<span className='bubble-text disabled'>Knocking . . .</span>);
    const knockCopy = (
      <div className='knock'>
        Type something the host will recognize and know to let you in.
      </div>
    );
    const lockedCopy = (
      <div className='locked-out'>
        This meeting is currently locked and you cannot join.
      </div>
    );
    const copy = this.props.allowKnocking ? knockCopy : lockedCopy;
    const showBubble = this.props.allowKnocking ? bubble : undefined;
    return (
      <BrightBox type='primary' title={title} className='phase locked' bubble={showBubble} onSubmit={this.knock}>
        {copy}
      </BrightBox>
    );
  }
}

const selector = state => {
  return {
    lockedOut: state.lockedOut,
    allowKnocking: state.allowKnocking
  };
};
export default connect(selector)(Knocking);
