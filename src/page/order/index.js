import React from 'react'
import {Modal, DatePicker, Button, Card, Form, Select, Table} from 'antd'
import Utils from "../../utils/utils"
import axios from '../../axios'
import BaseForm from '../../components/baseform'
import LearnForm from '../../components/baseform/learn-1'

const FormItem = Form.Item
const Option = Select.Option

class Order extends React.Component {

  state = {
    list: [],
    pagination: {},
    selectedRowKeys: '',
    selectedRowItem: {},
    selectedIds: '',
    selectedRows: []
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city_id',
      placeholder: '全部',
      width: 100,
      initialValue: '1',
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '北京'},
        {id: '2', name: '天津'},
        {id: '3', name: '杭州'}
      ]
    },
    {
      type: '时间查询',
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'state',
      placeholder: '全部',
      width: 100,
      initialValue: '1',
      list: [
        {id: '0', name: '全部'},
        {id: '1', name: '进行中'},
        {id: '2', name: '结束行程'},
      ]
    }
  ]

  componentDidMount() {
    this.requestList()
  }

  handleFilter = (params) => {
    let _this = this
    this.params = Object.assign({}, _this.params, params)
    this.requestList(this.params)
  }

  // 订单详情
  openOrderDetail = () => {
    let item = this.state.selectedRowItem
    if (!item.id) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单'
      })
      return
    }
    window.open(`#/common/order/detail/${item.id}`, '_blank')
  }

  // 表格单行点击
  // 作用： 1.存该条数据 selectedItem,
  // 2. selectedId ==> 对应 rowSelection 中的 selectedRowKeys
  onRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedRowItem: record
    })
  }

  requestList = (params) => {
    const _this = this

    axios.requestList(this, '/order/list', this.params)
  //  axios.ajax({
  //    url: '/order/list',
  //    data: {
  //      params
  //    }
  //  }).then(res => {
  //    if (res.code == 0) {
  //      let list = res.result.item_list.map((item, index) => {
  //        item.key = index
  //        return item
  //      })
  //      this.setState({
  //        list: list,
  //        pagination: Utils.pagination(res, (current) => {
  //          _this.params.page = current
  //          _this.requestList()
  //        })
  //      })
  //    }
  //  })

  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '里程',
        dataIndex: 'distance'
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
      ]
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
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
    return (
      <div>
        <Card>
          <LearnForm
            filterSubmit={this.handleFilter}
            formList={this.formList}
          />

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

export default Order

class FilterFormsss extends React.Component {
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Form layout="inline">
          <FormItem width={300} label='城市'>
            {
              getFieldDecorator('city', {
                initialValue: ''
              })(
                <Select>
                  <Option value=''> 全部 </Option>
                  <Option value='1'> 北京 </Option>
                  <Option value='2'> 天津 </Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem width={300} label='订单状态'>
            {
              getFieldDecorator('state', {
                initialValue: ''
              })(
                <Select>
                  <Option value=''> 全部 </Option>
                  <Option value='1'> 进行中 </Option>
                  <Option value='2'> 结束行程 </Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem width={200} label='订单时间'>
            {
              getFieldDecorator('start_time', {
              })(
                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
              )
            }
          </FormItem>
          <FormItem width={200} label='~'>
            {
              getFieldDecorator('end_time', {
              })(
                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
              )
            }
          </FormItem>
          <FormItem>
            <Button type='primary'>查询</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const FilterForms = Form.create()(FilterFormsss)

