import React from 'react'
import { Card, Button, Radio, notification, message } from 'antd'

export default class Messages extends React.Component {

  success = () => {
    message.success('success')
  }

  error = () => {
    message.error('success')
  }

  info = () => {
    message.info('success')
  }

  warning = () => {
    message.warning('success')
  }

  loading = () => {
    message.loading('加载中...')
  }

  render() {
    return (
      <div>
        <Card title='全局提示框' className='card-wrap'>
          <Button type='primary' onClick={this.success}>Success</Button>
          <Button type='primary' onClick={this.error}>error</Button>
          <Button type='primary' onClick={this.info}>info</Button>
          <Button type='primary' onClick={this.warning}>warning</Button>
          <Button type='primary' onClick={this.loading}>loading</Button>
        </Card>
      </div>
    )
  }
}