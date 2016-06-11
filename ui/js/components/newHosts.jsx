import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setNewHosts} from '../../../shared/actions/index';
import {dispatch} from '../services/socket';

class NewHosts extends Component {
  constructor(props){
    super(props);
    this.toggleNewHosts = this.toggleNewHosts.bind(this);
  }
  toggleNewHosts(){
    if(this.props.newHosts){
      dispatch(setNewHosts(false));
    } else {
      dispatch(setNewHosts(true));
    }
  }
  render(){
    return (
      <div className='new-hosts-toggle'>
        <label>Allow Hosts</label>
        <div className='toggle-wrapper'>
          <input type='checkbox' className='toggle' checked={this.props.newHosts} readOnly/>
          <label onClick={this.toggleNewHosts} />
        </div>
      </div>
    );
  }
}

const selector = state => {
  return {
    newHosts: state.newHosts
  };
};
export default connect(selector)(NewHosts);
