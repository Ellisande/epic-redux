import React, {Component} from 'react';
import {connect} from 'react-redux';
import BrightBox from './brightBox';

class Knockers extends Component {
  constructor(props){
    super(props);
  }
  render(){
    const showKnocking = this.props.knockers.length > 0 ? {} : {display: 'none'};
    const mapKnocker = knocker => (<div className='knocker' key={knocker.id}>{knocker.message}</div>);
    return (
      <BrightBox type='tertiary' title='Knocking' style={showKnocking}>
        <div className='knockers'>
          {this.props.knockers.map(mapKnocker)}
        </div>
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
