import React from "react";
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axiox from '../../axios'

export default class Header extends React.Component {

  state = {}

  componentWillMount() {
    this.setState({
      userName: '栖息'
    })
    this.getCurrentTime()
    this.getCurrentWeather()
    setInterval(this.getCurrentTime, 1000)
  }

  getCurrentTime = () => {
    let systemTime = Util.formateDate(new Date().getTime())
    this.setState({
      systemTime
    })
  }

  // axios 不能跨域 ==> 使用 jsonp 跨域
  getCurrentWeather = () => {
    let city = '北京' // 下文需对中文进行编码 encodeURIComponent(city)
    axiox.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
    }).then(res => {
      if (res.status === 'success') {
        let data = res.results[0].weather_data[0]
        this.setState({
          weather: data.weather,
          dayPictureUrl: data.dayPictureUrl
        })
      }
    })
  }

  render() {
    const { systemTime, weather, dayPictureUrl } = this.state
    const { menuType } = this.props
    return (
      <div className='header'>
        <Row className='header-top'>
          {
            menuType ? <Col span={6} className='logo'>
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>IMMOC 通用管理系统</span>
            </Col> : ''
          }
          <Col span={menuType ? '18' : '24'}>
            <span> 你好，{this.state.userName} </span>
            <a href="/" style={{color: 'black'}}>退出</a>
          </Col>
        </Row>
        {
          menuType ? '' : <Row className='breadcrumb'>
            <Col span={4} className='breadcrumb-title'>
              首页
            </Col>
            <Col span={20} className='weather'>
              <span className='weather-date'>{systemTime}</span>
              <span className='weather-content'>
              <img src={dayPictureUrl} alt="weather" style={{width: '25px'}}/>
                {weather}
            </span>
            </Col>
          </Row>
        }


      </div>
    )
  }
}