import React from 'react'
import { Modal, Card, Table, Button, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'

export default class BasicTable extends React.Component {

  state = {
    dataSource: [],
    dataSource2: [],
    dataSource3: [],
    selectRowKeys: [],
    selectedIds: [],
    selectedItem: '',
    pagination: {}
  }

  params = {
    page: 1
  }

  componentDidMount() {
    let dataSource = [
      {
        id: '0',
        userName: 'jack',
        sex: '1',
        state: '1',
        interests: '1',
        birthday: '2000-01-01',
        address: '支付宝大楼'
      },{
        id: '1',
        userName: 'jackMa',
        sex: '1',
        state: '1',
        interests: '1',
        birthday: '2000-01-01',
        address: '支付宝大楼'
      },{
        id: '2',
        userName: 'jackChen',
        sex: '1',
        state: '1',
        interests: '1',
        birthday: '2000-01-01',
        address: '支付宝大楼'
      }
    ]
    dataSource.map((item, index) => {
      return item.key = index
    })
    this.requestTableData()
    this.setState({
      dataSource
    })
  }

  // 动态获取mock数据
  requestTableData = () => {
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
          dataSource3: res.result.list,
          pagination: Utils.pagination(res, (current) => {
            // TODO 获取当前页面 传给接口
            _this.params.page = current
            this.requestTableData()
          })
        })
      }
    })
  }

  // 用户点击每一行
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

  // 删除按钮提示
  handleDelete = () => {
    const {selectedIds, selectedItem} = this.state
    Modal.warning({
      title: '删除',
      content: `你确定要删除么${selectedItem.id}`,
      onOk: () => {
        message.success('删除成功')
      }
    })
  }

  render() {
    const columns = [
      {
        title: 'id', // 对应的列名
        dataIndex: 'id', // 数据源属性值 需要渲染的字段
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) { // render 默认接收到dataIndex字段里面到值
          return sex === 1 ? '男' : '女'
        }
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
        }
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
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      }
    ]

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (key, row) => {
        console.log(key)
        console.log(row)
      }
    }

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
        <Card title='基础表格'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />

        </Card>
        <Card title='动态数据渲染表格 - Mock' style={{marginTop: 20}}>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
          />

        </Card>

        <Card title='单选表格 - Mock' style={{marginTop: 20}}>
          <Table
            columns={columns}
            rowSelection={rowSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource3}
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
        <Card title='多选表格 - Mock' style={{marginTop: 20}}>
          <div>
            <Button onClick={this.handleDelete} type='primary'>删除</Button>
          </div>
          <Table
            columns={columns}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource3}
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
        <Card title='分页 - Mock' style={{marginTop: 20}}>
          <Table
            columns={columns}
            rowSelection={rowCheckSelection} // type(单选或者多选); onSelect(选中之后到回调); onChange(选中的切换回调)
            dataSource={this.state.dataSource3}
            bordered
            pagination={this.state.pagination}
          />

        </Card>
      </div>
    )
  }
}