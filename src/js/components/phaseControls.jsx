import React, {Component} from 'react';
import {changePhase} from '../actions';
import {connect} from 'react-redux';
import Timer from './timer';
import Host from './host';
import BrightBox from './brightBox';

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
    const showNext = this.props.phase !== 'complete' && this.props.host;
    const nextStyle = showNext ? {} : {display: 'none'};
    return (
      <div className='phase-controls'>
        <BrightBox title='Phase' type='tertiary'>
          <div className='phase-current'>
             {this.props.phase}
          </div>
          <div className='next-phase' style={nextStyle}>
            <a href='#' onClick={this.nextPhase}>Next ></a>
          </div>
        </BrightBox>
        <Timer />
        <Host />
      </div>);
  }
}

export default connect(i=>i)(PhaseControls);
