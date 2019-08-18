import React from 'react'
import { Card, Button, Radio, notification } from 'antd'

export default class Notices extends React.Component {

  openNotification = (type, position) => {
    if (position) {
      // 可以配置一些config参数
      notification.config({
        placement: position
      })
    }
    notification[type]({
      message: '发工资了！！！',
      description: '你这个月的工资为-1元',
    })

  }

  render() {
    return (
      <div>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='primary' onClick={() => {this.openNotification('success')}}>success</Button>
          <Button type='primary' onClick={() => {this.openNotification('info')}}>info</Button>
          <Button type='primary' onClick={() => {this.openNotification('warning')}}>warning</Button>
          <Button type='primary' onClick={() => {this.openNotification('error')}}>error</Button>
        </Card>

        <Card title='通知提醒框' className='card-wrap'>
          <Button type='primary' onClick={() => {this.openNotification('success', 'topLeft')}}>success</Button>
          <Button type='primary' onClick={() => {this.openNotification('info', 'topRight')}}>info</Button>
          <Button type='primary' onClick={() => {this.openNotification('warning', 'bottomLeft')}}>warning</Button>
          <Button type='primary' onClick={() => {this.openNotification('error', 'bottomRight')}}>error</Button>
        </Card>
      </div>
    )
  }
}