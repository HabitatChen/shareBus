import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import Home from './page/home'
import './style/common.less'

export default class Admin extends React.Component {

  render() {
    return (
      <div>
        <Row className="container">
          <Col span={4} className='nav-left'>
            <NavLeft />
          </Col>
          <Col span={20} className="main">
            <Header />
            <Row className="content">
              { /*子组件放在这里*/ }
              {this.props.children}
            </Row>
            <Footer />
          </Col>
        </Row>

      </div>
    )
  }
}