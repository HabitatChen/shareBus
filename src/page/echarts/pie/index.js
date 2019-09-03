import React from 'react'
import { Card } from 'antd'
// import echarts from 'echarts' 导入所有库
// 按需加载
// 导入饼图 基础功能
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from "echarts-for-react"


export default class Bar extends React.Component {

  componentWillMount() {
    // 注入主题。。 没有主题文件
    // echarts.registerTheme('Imooc', echartTheme)
  }

  // 获取主题的配置
  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
        // 通过绝对定位去让副标题定位
        orient: 'vertical',
        right: 10,
        top: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周1'
            },
            {
              value: 500,
              name: '周2'
            },{
              value: 600,
              name: '周3'
            },{
              value: 700,
              name: '周4'
            },{
              value: 800,
              name: '周5'
            },{
              value: 900,
              name: '周6'
            },{
              value: 200,
              name: '周7'
            },
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
        x: 'center'
      },
      legend: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
        // 通过绝对定位去让副标题定位
        orient: 'vertical',
        right: 10,
        top: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '60%'], // 控制图标的位置
          data: [
            {
              value: 1000,
              name: '周1'
            },
            {
              value: 500,
              name: '周2'
            },{
              value: 600,
              name: '周3'
            },{
              value: 700,
              name: '周4'
            },{
              value: 800,
              name: '周5'
            },{
              value: 900,
              name: '周6'
            },{
              value: 200,
              name: '周7'
            },
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
      legend: {
        data: ['周1','周2','周3','周4','周5','周6','周7'],
        // 通过绝对定位去让副标题定位
        orient: 'vertical',
        right: 10,
        top: 20
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          center: ['50%', '60%'], // 控制图标的位置
          data: [
            {
              value: 1000,
              name: '周1'
            },
            {
              value: 500,
              name: '周2'
            },{
              value: 600,
              name: '周3'
            },{
              value: 700,
              name: '周4'
            },{
              value: 800,
              name: '周5'
            },{
              value: 900,
              name: '周6'
            },{
              value: 800,
              name: '周7'
            },
          ].sort((a, b) => {
            return a.value - b.value
          }),
          roseType: 'radius'
        }
      ]
    }

    return option
  }

  render() {
    return (
      <div>
        <Card title='饼图表之一'>
          <ReactEcharts
            // theme='Imooc'
            style={{height: 500}}
            option={this.getOption()}
          />
        </Card>
        <Card title='饼图表之二' style={{marginTop: 10}}>
          <ReactEcharts
            // theme='Imooc'
            style={{height: 500}}
            option={this.getOption2()}
          />
        </Card>
        <Card title='饼图表之二' style={{marginTop: 10}}>
          <ReactEcharts
            // theme='Imooc'
            style={{height: 500}}
            option={this.getOption3()}
          />
        </Card>
      </div>
    )
  }
}