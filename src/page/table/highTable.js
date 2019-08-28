import React from 'react'
import { Badge, Modal, Card, Table, Button, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'

export default class HighTable extends React.Component {

  state = {
    dataSource: [],
    pagination: {},
    selectedRowKeys: [],
    selectedItem: [],
    sortOrder: '',
    selectedRows: [],
  }

  params = {
    currentPage: 1
  }

  // 调用请求的方法
  componentDidMount() {
    this.request()
  }

  // 表格change事件触发
  handleTableChange = (pagination, filters, sorter) => {
    console.log('sorter')
    console.log(sorter)
    this.setState({
      sortOrder: sorter.order
    })
  }

  // table 中删除按钮
  handleDeleteRow = (item) => {
    let id = item.id
    Modal.confirm({
      title: '确认',
      content: '您确定要删除此条数据么',
      onOk: () => {
        message.success('删除成功')
        this.request()
      }
    })
  }

  // 点击表格单行数据
  onRowClick = (record, index) => {
    let selectKey = [index]; // 为什么是数组 因为有可能是多选的
    console.log('here console')
    console.log(selectKey)
    console.log(record)
    this.setState({
      selectedRowKeys: selectKey, // 然后把当前所中的key值和当前选中的内容项保存到state中
      selectedItem: record
    })
  }

  // 请求mock数据
  request = () => {
    let _this = this
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: _this.params.page
        }
      }
    }).then((res) => {
      if (res.code === 0) {
        res.result.list.map((item, index) => {
          return item.key === index
        })
        this.setState({
          dataSource: res.result.list,
          pagination: Utils.pagination(res, (current) => {
            // TODO 获取当前页面 传给接口
            _this.params.page = current
            this.request()
          })
        })
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id', // 对应的列名
        dataIndex: 'id', // 数据源属性值 需要渲染的字段
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) { // render 默认接收到dataIndex字段里面到值
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': 'hello',
            '2': 'world',
            '3': 'nihao',
            '4': '你号么',
            '5': 'sha diao'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '爱好',
        dataIndex: 'interests',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '健身',
            '3': '🏀',
            '4': '跑步',
            '5': '桌球',
            '6': '爬山',
            '7': '藏藏个',
            '8': '你好'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      }
    ]
    const columns2 = [
      {
        title: 'id', // 对应的列名
        dataIndex: 'id', // 数据源属性值 需要渲染的字段
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => { // a, b 是列的字段 通过a.age 可以获得a中的age值
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder,
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) { // render 默认接收到dataIndex字段里面到值
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': 'hello',
            '2': 'world',
            '3': 'nihao',
            '4': '你号么',
            '5': 'sha diao'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '爱好',
        dataIndex: 'interests',
        render(state) {
          let config = {
            '1': '游泳',
            '2': '健身',
            '3': '🏀',
            '4': '跑步',
            '5': '桌球',
            '6': '爬山',
            '7': '藏藏个',
            '8': '你好'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120
      }
    ]
    const columns3 = [
      {
        title: 'id', // 对应的列名
        dataIndex: 'id', // 数据源属性值 需要渲染的字段
        width: 80
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 80
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) { // render 默认接收到dataIndex字段里面到值
          return sex === 1 ? '男' : '女'
        },
        width: 80
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': 'hello',
            '2': 'world',
            '3': 'nihao',
            '4': '你号么',
            '5': 'sha diao'
          }
          return config[state]
        },
        width: 80
      },
      {
        title: '爱好',
        dataIndex: 'interests',
        render(interests) {
          let config = {
            '1': <Badge status='success' text='游泳' />,
            '2': <Badge status='error' text='健身' />,
            '3': <Badge status='default' text='🏀' />,
            '4': <Badge status='warning' text='跑步' />,
            '5': <Badge status='success' text='骑行' />,
            '6': <Badge status='success' text='你好' />,
            '7': <Badge status='success' text='游泳' />,
            '8': <Badge status='success' text='栖息' />,
          }
          return config[interests]
        },
        width: 80
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120
      },
      {
        title: '操作',
        width: 120,
        render: (text, item) => { // 如果写成 render() => {} 则里面的this指向有问题，须写成箭头函数
          return <a onClick={(item) => {this.handleDeleteRow(item)}}>删除</a>
        }
      }
    ]

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = []
        selectedRows.map(item => {
          ids.push(item.id)
        })
        //  const selectedIds = selectedRows.map(item => {
        //    return item.id
        //  })
        console.log('selectedRows')
        console.log(selectedRows)
        console.log('record')
        console.log(this.state.selectedItem)
        this.setState({
          selectedRowKeys, // 这个是必须的
          selectedIds: ids, // 附加的
          selectedRows: selectedRows // 多选时 把选中的所有数据存起来 方便管理 onRow 会存单条数据
        })
      }
    }

    return (
      <div>
        <Card title='头部固定' style={{marginTop: 20}}>
          <Table
            columns={columns}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource}
            bordered
            scroll={{y: 240}}
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => { // row 当前行被点击之后的回调
                  this.onRowClick(record, index)
                }
              }
            }}
          />

        </Card>
        <Card title='左侧固定' style={{marginTop: 20}}>
          <Table
            columns={columns}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => { // row 当前行被点击之后的回调
                  this.onRowClick(record, index)
                }
              }
            }}
          />

        </Card>
        <Card title='表格排序' style={{marginTop: 20}}>
          <Table
            columns={columns2}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => { // row 当前行被点击之后的回调
                  this.onRowClick(record, index)
                }
              }
            }}
            onChange={this.handleTableChange} // 分页、排序、 筛选时发生变化的回调
          />

        </Card>
        <Card title='操作按钮' style={{marginTop: 20}}>
          <Table
            columns={columns3}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => { // row 当前行被点击之后的回调
                  this.onRowClick(record, index)
                }
              }
            }}
          />

        </Card>
      </div>
    )
  }
}