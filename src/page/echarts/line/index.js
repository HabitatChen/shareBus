import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts' // 导入所有库
// 按需加载
// 导入饼图 基础功能
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from "echarts-for-react"

// 导入一个主题
import echartTheme from './../theme'


export default class Bar extends React.Component {

  componentWillMount() {

    // 注入主题。。 没有主题文件
     echarts.registerTheme('Imooc', echartTheme)
    console.log('abc')
    console.log(echartTheme)
    console.log(echarts.registerTheme)
  }

  componentDidMount() {
    console.log('222')
    echarts.registerTheme('Imooc', echartTheme)
    console.log('abc')
    console.log(echartTheme)
  }

  // 获取主题的配置
  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [
            1000, 1200, 1400, 1300, 1100, 1600, 1000
          ]
        }
      ]
    }

    return option
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['OFO订单量', 'mobile订单量']
      },
      xAxis: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [
            1000, 1200, 1400, 1300, 1100, 1600, 1000
          ]
        },
        {
          name: 'mobile订单量',
          type: 'line',
          data: [
            2000, 1500, 1700, 2300, 2100, 1900, 3000
          ]
        }
      ]
    }

    return option
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [
            1000, 1200, 1400, 1300, 1100, 1600, 1000
          ],
          areaStyle: {}
        }
      ]
    }

    return option
  }

  render() {
    return (
      <div>
        <Card title='折线图表之一'>
          <ReactEcharts
            theme={"Imooc"}
            style={{height: 500}}
            option={this.getOption()}
          />
        </Card>
        <Card title='折线图表之二' style={{marginTop: 10}}>
          <ReactEcharts
            theme={'Imooc'}
            style={{height: 500}}
            option={this.getOption2()}
          />
        </Card>
        <Card title='折线图表之二' style={{marginTop: 10}}>
          <ReactEcharts
            theme={'Imooc'}
            style={{height: 500}}
            option={this.getOption3()}
          />
        </Card>
      </div>
    )
  }
}