import React from 'react'
import { Modal, Card, Button } from 'antd'
import './index.less'

export default class Modals extends React.Component {

  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  }

  handleOpen = (type) => {
    console.log(type)
    this.setState({
      [type]: true
    })
  }

  // 确认框
  handleConfirm = (type) => {
    Modal[type]({  // 动态调用
      title: '确认',
      content: '你确定是这样么?',
      onOk: () => { // 确认事件
        console.log('ok')
      },
      onCancel: () => { // 取消事件
        console.log('cancel')
      }
    })
  }

  handleModalCancel = () => {
    this.setState({
      showModal1: false
    })
  }

  render() {
    return (
      <div>
        <Card title='基础模态框' className='card-wrap'>
          <Button type='primary' onClick={() => {this.handleOpen('showModal1')}}>open</Button>
          <Button type='primary' onClick={() => {this.handleOpen('showModal2')}}>自定义页脚</Button>
          <Button type='primary' onClick={() => {this.handleOpen('showModal3')}}>顶部20px弹框</Button>
          <Button type='primary' onClick={() => {this.handleOpen('showModal4')}}>水平垂直居中</Button>
        </Card>
        <Modal
          title='React'
          visible={this.state.showModal1}
          onCancel={this.handleModalCancel}
        >
          <p>
            你好我是xxx
          </p>
        </Modal>
        <Modal
          title='React'
          visible={this.state.showModal2}
          oktext='下一步'
          cancelText='算了吧'
          onCancel={() => {this.setState({showModal2: false})}}
        >
          <p>
            你好我是xxx
          </p>
        </Modal>
        <Modal
          style={{top: 20}}
          title='React'
          visible={this.state.showModal3}
          onCancel={() => {this.setState({showModal3: false})}}
        >
          <p>
            距离顶部20px 需要添加自定义样式
          </p>
        </Modal>
        <Modal
          title='React'
          wrapClassName='vertical-center-modal'
          visible={this.state.showModal4}
          onCancel={() => {this.setState({showModal4: false})}}
        >
          <p>
            距离顶部20px 需要添加自定义样式
          </p>
        </Modal>

        <Card title='信息确认框' className='card-wrap'>
          <Button type='primary' onClick={() => {this.handleConfirm('confirm')}}>confirm</Button>
          <Button type='primary' onClick={() => {this.handleConfirm('info')}}>info</Button>
          <Button type='primary' onClick={() => {this.handleConfirm('success')}}>success</Button>
          <Button type='primary' onClick={() => {this.handleConfirm('warning')}}>warning</Button>
        </Card>
      </div>
    )
  }
}