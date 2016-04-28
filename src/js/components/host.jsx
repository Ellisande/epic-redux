import React, {Component} from 'react';
import {connect} from 'react-redux';

class Host extends Component {
  constructor(props){
    super(props);
    this.state = {
      isHost: false
    };
    this.toggleHost = this.toggleHost.bind(this);
  }
  toggleHost(){
    if(this.state.isHost){
      return this.setState({isHost: false});
    }
    return this.setState({isHost: true});
  }
  render(){
    const hostStyle = {
      display: this.state.isHost ? 'flex' : 'none'
    };
    return (
      <div className='host'>
        <div className='host-title'>Host</div>
        <div className='host-content'>
          <div className='host-toggle'>
            <label>Host</label>
            <div className='toggle-wrapper'>
              <input type='checkbox' className='toggle' checked={this.state.isHost}/>
              <label onClick={this.toggleHost} />
            </div>
          </div>
          <div className='host-current' style={hostStyle}>
            <span>You are a host.</span>
          </div>
        </div>
      </div>);
  }
}

export default connect(i=>i)(Host);
