import React from 'react'
import { Card, Button, Spin, Icon, Alert } from 'antd'

export default class Loadings extends React.Component {
  render() {
    const spinIcon = <Icon type="step-backward" spin/>
    const loadingIcon = <Icon type="loading" />
    return (
      <div>
        <Card title='Spin 的用法' className='card-wrap'>
          <Spin />
          <Spin size='large' />
          <Spin indicator={spinIcon} />
          <Icon type="step-backward" spin/>
        </Card>

        <Card title='内容遮罩' className='card-wrap'>
          <Spin tip='加载中...'>
            <Alert
              message='React'
              description='欢迎来dao'
              type='info'
            />
          </Spin>

          <Spin indicator={loadingIcon} tip='加载中...'>
            <Alert
              message='React'
              description='欢迎来dao'
              type='info'
            />
          </Spin>

          <Alert
            message='React'
            description='欢迎来dao'
            type='warning'
            style={{marginTop: '10px'}}
          />
        </Card>

      </div>
    )
  }
}