import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import {setLocked, setNewHosts} from '../actions';
import {findUser} from '../store/utils';
import {dispatch} from '../services/socket';
import _ from 'lodash';

class Lock extends Component {
  constructor(props){
    super(props);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.toggleNewHosts = this.toggleNewHosts.bind(this);
  }
  toggleLocked(e){
    e.preventDefault();
    dispatch(setLocked(!this.props.locked));
  }
  toggleNewHosts(e){
    e.preventDefault();
    dispatch(setNewHosts(!this.props.newHosts));
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
       <div className='new-host-toggle' style={{display: 'none'}}>
         <label>Allow Hosts</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.newHosts} readOnly/>
           <label onClick={this.toggleNewHosts} />
         </div>
       </div>
      </BrightBox>);
  }
}

const selector = state => {
  const user = findUser(state);
  return {
    host: _.get(user, 'host', false),
    newHosts: state.newHosts,
    locked: state.locked
  };
};
export default connect(selector)(Lock);
