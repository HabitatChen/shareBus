import React from 'react'
import {Card, Button, Form, Table} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import FilterForm from './../../components/baseform'

export default class User extends React.Component {

  state = {
    list: [],
    pagination: {},
    selectedRowKeys: '',
    selectedRowItem: {},
    selectedIds: '',
    selectedRows: []
  }

  params = {
    page: 2,
  }

  componentDidMount() {
    this.requestList()
  }

  // 表格单行点击
  // 作用： 1.存该条数据 selectedItem,
  // 2. selectedId ==> 对应 rowSelection 中的 selectedRowKeys
  onRowClick = (record, index) => {
    console.log('111')
    console.log(record, index)
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedRowItem: record
    })
  }

    formList = [
      {
        type: 'SELECT',
        label: '城市',
        field: 'city_id',
        placeholder: '全部',
        width: 80,
        initialValue: '1',
        list: [
          {id: '0', name: '全部'},
          {id: '1', name: '北京'},
          {id: '2', name: '天津'},
          {id: '3', name: '杭州'}
        ]
      },
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名称',
      width: 80,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入用户手机号',
      width: 80,
    },
    {
      type: 'DATE',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请输入日期',
      width: 80,
    }
  ]

  handleFormSubmit = (params) => {
    this.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  render() {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('on change selectedRowKeys')
        console.log(selectedRowKeys)
        let ids = []
        selectedRows.map(item => {
          ids.push(item.id)
        })
        this.setState({
          selectedRowKeys, // 这个是必须的
          selectedIds: ids, // 附加的
          selectedRows: selectedRows // 多选时 把选中的所有数据存起来 方便管理 onRow 会存单条数据
        })
      }
    }
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: (sex) => {
          return sex === '1' ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: (state) => {
          return {
            '1': 'aaa',
            '2': 'bbb',
            '3': 'ccc',
            '4': 'ddd',
            '5': 'heelo'
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render: (state) => {
          return {
            '1': 'aaa',
            '2': 'bbb',
            '3': 'ccc',
            '4': 'ddd',
            '5': 'aaa',
            '6': 'bbb',
            '7': 'ccc',
            '8': 'ddd'
          }[state]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    return (
      <div>
        <Card>
          <FilterForm formList={this.formList} filterSubmit={this.handleFormSubmit} />
        </Card>
        <Card>
          <Button onClick={this.openOrderDetail}>订单详情</Button>
          <Button>结束订单</Button>
        </Card>
        <div className='content-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => { // row 当前行被点击之后的回调
                  this.onRowClick(record, index)
                }
              }
            }}
          />
        </div>
      </div>
    )
  }
}