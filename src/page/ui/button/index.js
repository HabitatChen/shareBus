import React from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './index.less'
import '../ui.less'

export default class Buttons extends React.Component {

  state = {
    loading: true,
    size: 'default'
  }

  // 关闭按钮 切换loading状态
  handleCloseLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  // 改变size的值
  changeButtonSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Card title='基础按钮' className='card-wrap'>
          <Button type='primary'>habitat</Button>
          <Button >habitat</Button>
          <Button type='dashed'>habitat</Button>
          <Button type='danger'>habitat</Button>
          <Button disabled type='danger'>habitat</Button>
        </Card>
        <Card title='图形按钮' className='card-wrap'>
          <Button icon='plus'>创建</Button>
          <Button icon='edit'>编辑</Button>
          <Button icon='delete'>删除</Button>
          <Button icon='search'>搜索</Button>
          <Button icon='search' shape="circle" type='primary' />
          <Button icon='caret-up' type='primary' />
          <Button icon='download'>下载</Button>
          <span className='upDown'>
            <Icon type="caret-up" className='up' />
            <Icon type="caret-down" className='down' />
          </span>
        </Card>
        <Card title='Loading 按钮' className='card-wrap'>
          <Button type='primary' loading={this.state.loading}>确定</Button>
          <Button type='primary' shape='circle' loading={this.state.loading} />
          <Button shape='circle' loading={this.state.loading} />
          <Button loading={this.state.loading}>点击加载</Button>
          <Button type='primary' onClick={this.handleCloseLoading}>切换loading状态</Button>
        </Card>
        <Card titie='按钮组' className='card-wrap'>
          <Button.Group className='button-group'>
            <Button icon='caret-left' type='primary'>上一个</Button>
            <Button icon='caret-right' type='primary'>下一个</Button>
          </Button.Group>
        </Card>
        <Card title='按钮尺寸'>
          <Radio.Group  value={this.state.size} onChange={this.changeButtonSize}>
            <Radio value='small'>小</Radio>
            <Radio value='default'>中</Radio>
            <Radio value='large'>大</Radio>
          </Radio.Group>
          <Button type='primary' size={this.state.size}>habitat</Button>
          <Button size={this.state.size}>habitat</Button>
          <Button size={this.state.size}type='dashed'>habitat</Button>
        </Card>
      </div>
    )
  }
}