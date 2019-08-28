import React from 'react'
import {Card} from 'antd'
import axios from '../../axios'
import './detail.less'

export default class Details extends React.Component {

  state = {
    orderInfo: {}
  }

  componentDidMount() {
    let orderId = this.props.match.params.orderId  // 获取动态路由的ID
    if  (orderId) {
      this.request(orderId)
    }
  }

  renderMap = (res) => {
    this.map = new window.BMap.Map("orderDetailMap");
    this.map.centerAndZoom( '北京', 11);
    this.addMapControl()
    this.drawBikeRoute(res.position_list)
  }

  // 添加地图控件
  addMapControl = (res) => {
    let map = this.map
    map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}))
    map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_LEFT}))
  }


  request = (orderId) => {
    axios.ajax({
      url: '/order/detail',
      data: {
        params: {
          orderId
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          orderInfo: res.result
        })
        this.renderMap(res.result)
      }
    })

  }

  // 绘制用户的行驶路线
  drawBikeRoute = (pointList) => {
    let map = this.map
    let startPoint = ''
    let endPoint = ''
    if (pointList.length > 0) {
      let arr = pointList[0]
      startPoint = new window.BMap.Point(arr.lon, arr.lat)
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize:  new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let startMaker = new window.BMap.Marker(startPoint, {icon: startIcon})
    }

  }

  render() {
    const info = this.state.orderInfo || {}
    return (
      <div>
        <Card>
          <div id='orderDetailMap' className='order-map'> </div>
          <div className="detail-items">
            <div className="item-title"> 基础信息 </div>
            <ul className="detail-list">
              <li>
                <div className="detail-form-left"> 用车模式 </div>
                <div className="detail-form-content">{info.name == 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left"> 订单编号 </div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left"> 车辆编号 </div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left"> 用户姓名 </div>
                <div className="detail-form-content">{info.user_name}</div>
              </li><li>
              <div className="detail-form-left"> 手机号 </div>
              <div className="detail-form-content">{info.mobile}</div>
            </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title"> 行驶轨迹 </div>
            <ul className="detail-list">
              <li>
                <div className="detail-form-left"> 行程起点 </div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left"> 行程终点 </div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left"> 行驶里程 </div>
                <div className="detail-form-content">{info.distance / 1000}</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}
