import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import NewHosts from './newHosts';
import {setLocked, allowKnocking, disableKnocking} from '../../../shared/actions/index';
import {findUser} from '../../../shared/store/utils';
import {dispatch} from '../services/socket';
import _ from 'lodash';

class Lock extends Component {
  constructor(props){
    super(props);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.toggleKnock = this.toggleKnock.bind(this);
  }
  toggleLocked(e){
    e.preventDefault();
    dispatch(setLocked(!this.props.locked));
  }
  toggleKnock(e){
    e.preventDefault();
    if(this.props.allowKnocking){
      return dispatch(disableKnocking());
    }
    return dispatch(allowKnocking());
  }
  render(){
    const boxStyle = this.props.host ? {} : {display: 'none'};
    return (
      <BrightBox title='Room' type='tertiary' style={boxStyle}>
       <div className='lock-toggle'>
         <label>Lock Room</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.locked} readOnly/>
           <label onClick={this.toggleLocked} />
         </div>
       </div>
       <div className='knock-toggle'>
         <label>Allow Knocks</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.allowKnocking} readOnly/>
           <label onClick={this.toggleKnock} />
         </div>
       </div>
       <NewHosts/>
      </BrightBox>);
  }
}

const selector = state => {
  const user = findUser(state);
  return {
    host: _.get(user, 'host', false),
    newHosts: state.newHosts,
    locked: state.locked,
    allowKnocking: state.allowKnocking
  };
};
export default connect(selector)(Lock);
