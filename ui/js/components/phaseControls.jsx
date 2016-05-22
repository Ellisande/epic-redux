import React, {Component} from 'react';
import {changePhase} from '../../../shared/actions';
import {connect} from 'react-redux';
import Timer from './timer';
import Host from './host';
import Lock from './lock';
import Knockers from './knockers';
import BrightBox from './brightBox';
import {isUserHost} from '../../../shared/store/utils';
import {dispatch} from '../services/socket';

const phases = ['submit', 'merge', 'vote', 'discuss', 'complete'];
const getNextPhase = (currentPhase) => {
  if(currentPhase === 'complete'){
    return currentPhase;
  }
  const phaseIndex = phases.indexOf(currentPhase);
  return phases[phaseIndex + 1];
};
class PhaseControls extends Component {
  constructor(props){
    super(props);
    this.nextPhase = this.nextPhase.bind(this);
  }
  nextPhase(){
    const nextPhase = getNextPhase(this.props.phase);
    return dispatch(changePhase(nextPhase));
  }
  render(){
    const showNext = this.props.phase !== 'complete' && this.props.host;
    const nextStyle = showNext ? {} : {display: 'none'};
    const text = this.props.lockedOut ? 'Locked' : this.props.phase;
    return (
      <div className='phase-controls'>
        <Knockers style={this.props.host ? {} : {display: 'none'}}/>
        <BrightBox title='Phase' type='tertiary'>
          <div className='phase-current'>
             {text}
          </div>
          <div className='next-phase' style={nextStyle}>
            <a href='#' onClick={this.nextPhase}>Next ></a>
          </div>
        </BrightBox>
        <Timer />
        <Host />
        <Lock />
      </div>);
  }
}

const selector = state => {
  return {
    host: isUserHost(state),
    phase: state.phase,
    lockedOut: state.lockedOut
  };
};
export default connect(selector)(PhaseControls);
