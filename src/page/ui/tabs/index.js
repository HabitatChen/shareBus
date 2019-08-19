import React from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import '../ui.less'

const TabPane = Tabs.TabPane

export default class Tab extends React.Component {

  newTabIndex = 0

  state = {
    panes: [],
    activeKey: ''
  }

  componentWillMount() {
    const panes = [
      {
        title: 'tab 1',
        content: '我是tab1',
        key: '1'
      },
      {
        title: 'tab 2',
        content: '我是tab2',
        key: '2'
      }
    ]

    this.setState({
      panes,
      activeKey: panes[0].key
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  // 目标值是想要删除的key  targetKey
  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  handleChange = (key) => {
    message.info('Hi 你选择的是：' + key)
    this.setState({
      activeKey: key
    })
  }

  render() {
    return (
      <div>
        <Card title='Tab标签' className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab="Tab 1" key="1">
              欢迎学习react
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              欢迎学习react
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              react 牛逼
            </TabPane>
          </Tabs>
        </Card>

        <Card title='Tab图标标签' className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab={<span><Icon type='plus' />Tab 1</span>} key="1">
              欢迎学习react
            </TabPane>
            <TabPane tab={<span><Icon type='delete' />Tab 2</span>} key="2">
              欢迎学习react
            </TabPane>
            <TabPane tab={<span><Icon type='edit' />Tab 2</span>} key="3">
              react 牛逼
            </TabPane>
          </Tabs>
        </Card>

        <Card title='关闭 新增 tab' className='card-wrap'>
          <Tabs
            onEdit={this.onEdit}
            type="editable-card"
            onChange={this.handleChange}
            activeKey={this.state.activeKey}
          >
            {
              this.state.panes.map((item) => {
                return (
                    <TabPane
                      tab={<span><Icon type='plus' />{item.title}</span>}
                      key={item.key}
                    >
                      {item.content}
                    </TabPane>
                  )
              })
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}