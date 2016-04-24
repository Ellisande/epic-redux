import React, {Component} from 'react';
import SideBar from './sideBar';
import PhaseControls from './phaseControls';
import {connect} from 'react-redux';
import Submit from './submit';
import Merge from './merge';
import Voting from './voting';
import Discuss from './discuss';
import Complete from './complete';

class Meeting extends Component {
  render(){
    const phaseMap = {
      submit: (<Submit />),
      merge: (<Merge />),
      vote: (<Voting />),
      discuss: (<Discuss />),
      complete: (<Complete />)
    };
    const currentPhase = phaseMap[this.props.phase];
    return (
      <div className='meeting'>
        <SideBar participants={this.props.participants} />
        {currentPhase}
        <PhaseControls />
      </div>
    );
  }
}

export default connect(i=>i)(Meeting);
