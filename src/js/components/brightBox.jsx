import React, {Component} from 'react';
import _ from 'lodash';

const isEmpty = children => {
  if(_.isEmpty(children)){
    return true;
  }
  return children.every && !children.every(_.isEmpty);
};

class BrightBox extends Component {
  constructor(props){
    super(props);
    this.type = this.props.type || 'primary';
  }
  render(){
    const onSubmit = this.props.onSubmit || (() => {});
    const emptyState = (<div>{this.props.emptyState}</div>);
    const bubbleMarkup = (
      <form className={`bright-box-bubble ${this.type}`} onSubmit={onSubmit}>
        {this.props.bubble}
      </form>);
    const showBubble = this.props.bubble ? bubbleMarkup : undefined;
    return (
      <div className={`bright-box ${this.type} ${this.props.className}`} style={this.props.style}>
        <div className={`bright-box-title ${this.type}`}>{this.props.title}</div>
        {showBubble}
        <div className={`bright-box-content ${this.type}`}>
          {isEmpty(this.props.children) ? this.props.children : emptyState}
        </div>
      </div>);
  }
}

export default BrightBox;
