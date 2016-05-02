import React, {Component} from 'react';

class BrightBox extends Component {
  constructor(props){
    super(props);
    this.type = this.props.type || 'primary';
  }
  render(){
    const onSubmit = this.props.onSubmit || (() => {});
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
          {this.props.children}
        </div>
      </div>);
  }
}

export default BrightBox;
