import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import BrightBox from './brightBox';

class Timer extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const momentTimer = moment.duration(this.props.timer);
    let minuteString = momentTimer.minutes().toString();
    minuteString = minuteString.length === 1 ? `0${minuteString}` : minuteString;
    let secondsString = momentTimer.seconds().toString();
    secondsString = secondsString.length === 1 ? `0${secondsString}` : secondsString;
    const controlStyle = this.props.host ? {} : {display: 'none'};
    return (
      <BrightBox title='Timer' type='tertiary'>
        <div className='aaa'>
          <span>{minuteString}:{secondsString}</span>
          <div className='play-button fa fa-play' style={controlStyle}/>
        </div>
      </BrightBox>);
  }
}

export default connect(i=>i)(Timer );
