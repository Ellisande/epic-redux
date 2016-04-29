import React, {Component} from 'react';

class BrightBox extends Component {
  constructor(props){
    super(props);
    this.type = this.props.type || 'primary';
  }
  render(){
    return (
      <div className={`bright-box ${this.type} ${this.props.className}`}>
        <div className={`bright-box-title ${this.type}`}>{this.props.title}</div>
        <div className={`bright-box-content ${this.type}`}>
          {this.props.children}
        </div>
      </div>);
  }
}

export default BrightBox;
