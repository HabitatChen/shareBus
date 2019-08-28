import React from 'react'
import { Card, Row, Col, Modal} from 'antd'

export default class Gallery extends React.Component {

  state = {
    currentImg: '',
    showModal: false
  }

  openGallery = (url) => {
    const tempUrl = '/gallery/' + url
    this.setState({
      currentImg: tempUrl,
      showModal: true
    })
  }

  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png'],
    ]
    const imgList = imgs.map((item) =>
      item.map(childItem =>
        <Card
          style={{marginBottom: '10px'}}
          cover={<img src={'/gallery/' + childItem} onClick={() => {this.openGallery(childItem)}} />}
        >
          <Card.Meta
            title='React admin'
            description='hello world'
          />
        </Card>
      )
    )
    return (
      <div className='card-wrap'>
        <Row gutter={10}>
          <Col md={5}>
            {imgList[0]}
          </Col>
          <Col md={5}>
            {imgList[1]}
          </Col>
          <Col md={5}>
            {imgList[2]}
          </Col>
          <Col md={5}>
            {imgList[3]}
          </Col>
          <Col md={4}>
            {imgList[4]}
          </Col>
        </Row>
        <Modal
          visible={this.state.showModal}
          onCancel={() => {this.setState({showModal: false})}}
          footer={null}
          width={400}
          height={600}
          title='图片画廊'
        >
          <img style={{width: '100%', height: '100%'}} src={this.state.currentImg} alt=""/>
        </Modal>
      </div>
    )
  }
}