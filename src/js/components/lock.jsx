import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import {setLocked, setNewHosts} from '../actions';

class Lock extends Component {
  constructor(props){
    super(props);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.toggleNewHosts = this.toggleNewHosts.bind(this);
  }
  toggleLocked(e){
    e.preventDefault();
    this.props.dispatch(setLocked(!this.props.locked));
  }
  toggleNewHosts(e){
    e.preventDefault();
    this.props.dispatch(setNewHosts(!this.props.newHosts));
  }
  render(){
    const boxStyle = this.props.host ? {} : {display: 'none'};
    return (
      <BrightBox title='Room' type='tertiary' style={boxStyle}>
       <div className='lock-toggle'>
         <label>Lock Room</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.locked}/>
           <label onClick={this.toggleLocked} />
         </div>
       </div>
       <div className='new-host-toggle'>
         <label>Allow Hosts</label>
         <div className='toggle-wrapper'>
           <input type='checkbox' className='toggle' checked={this.props.newHosts}/>
           <label onClick={this.toggleNewHosts} />
         </div>
       </div>
      </BrightBox>);
  }
}

export default connect(i=>i)(Lock);
