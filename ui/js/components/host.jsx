import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setHost} from '../../../shared/actions';
import BrightBox from './brightBox';
import _ from 'lodash';
import {dispatch} from '../services/socket';
import {findUser} from '../../../shared/store/utils';

class Host extends Component {
  constructor(props){
    super(props);
    this.toggleHost = this.toggleHost.bind(this);
  }
  toggleHost(){
    dispatch(setHost(this.props.userId, !this.props.host));
  }
  render(){
    const hostStyle = this.props.host ? {} : {display: 'none'};
    const allowHostStyle = this.props.newHosts || this.props.host ? {} : {display: 'none'};
    const hideWhenLocked = this.props.lockedOut ? {display: 'none'} : {};
    const show = Object.assign({}, allowHostStyle, hideWhenLocked);
    return (
      <BrightBox title='Host' type='tertiary' style={show}>
       <div className='host-toggle'>
         <label>Host</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.host} readOnly/>
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
  const user = findUser(state);
  return {
    host: _.get(user, 'host', false),
    userId: state.userId,
    newHosts: state.newHosts,
    user,
    lockedOut: state.lockedOut
  };
};
export default connect(selector)(Host);
