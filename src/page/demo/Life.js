import React from 'react'
import Chart from "./Chart";
import './life.less'
import { Button } from 'antd'
import 'antd/dist/antd.css';

export default class Life extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return(
      <div>
        <p className='content'>
          react 生命周期
        </p>
        <Button type='primary'>nihao</Button>
        <button onClick={this.handleClick}>
          点击一下
        </button>
        <p>{this.state.count}</p>
        <Chart name={'nihao'}/>
      </div>
    )
  }

}