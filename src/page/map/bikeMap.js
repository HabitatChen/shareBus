import React from 'react'
import axios from './../../axios'
import  {Card, Form } from 'antd'
import BaseForm from '../../components/baseform'

export default class BikeMap extends React.Component {
  state = {
    total_count: ''
  }

  map = {}

  formList = [
    { type: '城市'},
    { type: '时间查询'},
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      list: [
        {
          id: '0',
          name: '全部'
        },
        {
          id: '1',
          name: '进行中'
        },{
          id: '2',
          name: '行程结束'
        },
      ]
    }
  ]

  params = {
    page: 1,
    params: {}
  }

  componentDidMount() {
    this.requestList()
  }

  // 处理查询结果
  handleFilterSubmit = (params) => {
    this.params = Object.assign(this.params, params)
    this.requestList()
  }

  // 查询数据
  requestList = () => {
    axios.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          total_count: res.result.total_count
        })
      }
      this.renderMap(res)
    })
  }

  // 渲染地图数据
  // new window.BMap.Marker(point, {icon: bikeIcon}) Marker 是覆盖物 一般放坐标点 坐标点 + icon
  // new window.BMap.Polyline(servicePointList, {配置项}) 画折线
  // 最后都通过 this.map.addOverlay() 添加到地图上去
  renderMap = (res) => {
    let list = res.result.route_list
    this.map = new window.BMap.Map('container')
    // 获取起点或者终点
    let gps1 = list[0].split(',')
    let startPoint = new window.BMap.Point(gps1[0], gps1[1])
    let gps2 = list[list.length - 1].split(',')
    let endPoint = new window.BMap.Point(gps2[0], gps2[1])
    // 把哪一个点放在中点
    this.map.centerAndZoom(endPoint, 11)

    // 绘制起点终点
    let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) // 偏移量
    })
    let bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon})
    this.map.addOverlay(bikeMarkerStart)

    let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) // 偏移量
    })
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon})
    this.map.addOverlay(bikeMarkerEnd)

    // 绘制车辆行驶路线
    let routeList = []
    list.forEach((item) => {
      let p = item.split(',')
      // 添加的是坐标点 然后画线
      routeList.push(new window.BMap.Point(p[0], p[1]))
    })
    // 画线 第一个参数是各个坐标点，第二个参数是画线的配置
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyLine)

    // 绘制服务区
    let servicePointList = []
    let serviceList = res.result.service_list
    serviceList.forEach(item => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat))
    })

      // polyline 是画折线
    let serviceLine = new window.BMap.Polyline(servicePointList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.map.addOverlay(serviceLine)

    // 电车的分布情况 同起点和终点
    let bikeList = res.result.bike_list
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42) // 偏移量
    })
    bikeList.forEach(item => {
      let p = item.split(',')
      let point = new window.BMap.Point(p[0], p[1])
      // 不允许把 icon 直接放到地图上 需要通过marker 最后使用addOverlay 追加上去
      let pointMarker = new window.BMap.Marker(point, {icon: bikeIcon})
      this.map.addOverlay(pointMarker)
    })

  }

  render() {
    const { total_count } = this.state.total_count
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
        </Card>
        <Card style={{marginTop: 10}}>
          <div>{total_count}</div>
          <div id='container' style={{height: 500}}>

          </div>
        </Card>
      </div>
    )
  }
}