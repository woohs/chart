import React, { Component } from 'react';
import { Button, Icon, Rate } from 'antd';

class ClickCounter extends Component {

  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      count: 0
    }
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }

  onClickButton() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    const counterStyle = {
      margin: '16px'
    }
    return (
      <div style={counterStyle}>
        <Button type="primary" block>Primary</Button>
        <Button type="primary" onClick={this.onClickButton}>Click Me</Button>
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
        <ShowNum count={this.state.count}>
          <div>
            <p>hello!</p>
          </div>

        </ShowNum>
        <Rate />
      </div>
    );
  }
}

const ShowNum = (props)=>{
  console.log(props.children);
  return (
    <div>
       次数: <span id="clickCount">{props.count}</span>
       {/* {props.children} */}
    </div>
  )
}

class Card extends Component{
  render(){
    return(
    <div>
      <p>card</p>
    </div>
    )
  }
}

export default ClickCounter;

