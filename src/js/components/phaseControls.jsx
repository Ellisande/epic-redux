import React, {Component} from 'react';
import {changePhase} from '../actions';
import {connect} from 'react-redux';
import Timer from './timer';

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
    this.nextPhase = this.nextPhase.bind(this, props.dispatch);
  }
  nextPhase(dispatch){
    const nextPhase = getNextPhase(this.props.phase);
    return dispatch(changePhase(nextPhase));
  }
  render(){
    return (
      <div className='phase-controls'>
        <div className='current-phase'>Phase: {this.props.phase}</div>
        <div className='next-phase'>
          <button onClick={this.nextPhase}>Next ></button>
        </div>
        <Timer />
      </div>);
  }
}

export default connect(i=>i)(PhaseControls);
