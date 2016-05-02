import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHost} from '../actions';
import BrightBox from './brightBox';

class Host extends Component {
  constructor(props){
    super(props);
    this.toggleHost = this.toggleHost.bind(this);
  }
  toggleHost(){
    this.props.dispatch(setHost(!this.props.host));
  }
  render(){
    const hostStyle = this.props.host ? {} : {display: 'none'};
    const allowHostStyle = this.props.newHosts || this.props.host ? {} : {display: 'none'};
    return (
      <BrightBox title='Host' type='tertiary' style={allowHostStyle}>
       <div className='host-toggle'>
         <label>Host</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.host}/>
           <label onClick={this.toggleHost} />
         </div>
       </div>
       <div className='host-current' style={hostStyle}>
         <span>You are a host.</span>
       </div>
      </BrightBox>);
  }
}

const selector = state => {
  return {
    host: state.host,
    newHosts: state.newHosts
  };
};
export default connect(selector)(Host);
