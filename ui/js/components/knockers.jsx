import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';
import {approveKnocker, rejectKnocker} from '../../../shared/actions';
import {dispatch} from '../services/socket';
import BrightButton from './brightButton';

class Knockers extends Component {
  constructor(props){
    super(props);
  }
  approveKnocker(knocker){
    dispatch(approveKnocker(knocker.id));
  }
  rejectKnocker(knocker){
    dispatch(rejectKnocker(knocker.id));
  }
  render(){
    const showKnocking = this.props.knockers.length > 0 ? {} : {display: 'none'};
    const knockStyle = Object.assign({}, showKnocking, this.props.style);
    const mapKnocker = knocker => (
      <div className='knocker' key={knocker.id}>
        <div className='knock-message'>{knocker.message}</div>
        <div className='knock-actions'>
          <BrightButton type='primary' icon='fa-check' onClick={this.approveKnocker.bind(this, knocker)} />
          <BrightButton type='tertiary' icon='fa-ban' onClick={this.rejectKnocker.bind(this, knocker)} />
        </div>
      </div>);
    return (
      <BrightBox type='tertiary' title='Knocking' style={knockStyle} className='knockers'>
          {this.props.knockers.map(mapKnocker)}
      </BrightBox>
    );
  }
}

const selector = state => {
  return {
    knockers: state.knockers
  };
};
export default connect(selector)(Knockers);
