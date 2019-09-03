import React from 'react'
import { Card } from 'antd'
// import echarts from 'echarts' 导入所有库
// 按需加载
// 导入柱形图 基础功能
import 'echarts/lib/chart/bar'
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
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis' // 展示 x 上的数据
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 3243, 1234, 903, 456, 123]
        }
      ]
    }

    return option
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis' // 展示 x轴 上的那条数据
      },
      legend: {
        data: ['OFO', 'mobile', 'ZhiFuBao']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [1000, 2000, 3243, 1234, 903, 456, 123]
        },
        {
          name: 'mobile',
          type: 'bar',
          data: [1000, 2000, 343, 2340, 1203, 2456, 123]
        },
        {
          name: 'ZhiFuBao',
          type: 'bar',
          data: [1000, 2500, 243, 1234, 1903, 4256, 1323]
        }
      ]
    }

    return option
  }

  render() {
    return (
      <div>
        <Card title='柱形图表之一'>
          <ReactEcharts
            // theme='Imooc'
            style={{height: 500}}
            option={this.getOption()}
          />
        </Card>
        <Card title='柱形图表之二' style={{marginTop: 10}}>
          <ReactEcharts
            // theme='Imooc'
            style={{height: 500}}
            option={this.getOption2()}
          />
        </Card>
      </div>
    )
  }
}