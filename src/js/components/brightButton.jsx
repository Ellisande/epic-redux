import React, {Component} from 'react';

class BrightButton extends Component {
  constructor(props){
    super(props);
    this.type = props.type || 'primary';
  }
  render(){
    return (
      <div className={`button ${this.type} ${this.props.className}`} onClick={this.props.onClick}>
        <i className={`fa ${this.props.icon}`} />
        <span>{this.props.children}</span>
      </div>);
  }
}

export default BrightButton;
