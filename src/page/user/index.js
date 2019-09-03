import React from 'react'
import {DatePicker, Radio, Input, Select, Modal, Card, Button, Form, Table} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import FilterForm from './../../components/baseform'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

export default class User extends React.Component {

  state = {
    list: [],
    pagination: {},
    selectedRowKeys: '',
    selectedRowItem: {},
    selectedIds: '',
    selectedRows: [],
    isVisible: false,
    userInfo: ''
  }

  params = {
    page: 1,
    params: {}
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
    this.params.params = params
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  // 处理增删改查
  handleOperate = (type) => {
    let item = this.state.selectedRowItem
    console.log(item)
    if (type === 'add') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type === 'edit') {
      if (Object.keys(item).length === 0) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type === 'detail') {
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else if (type === 'delete') {
      if (Object.keys(item).length === 0) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      Modal.confirm({
        title: '确认删除',
        content: `是否要删除员工: ${ item.username}`,
        onOk: () => {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then((res) => {
            if (res.code === 0) {
              this.setState({
                isVisible: false
              })
            }
            this.requestList()
          })
        }
      })
    }
  }

  // 创建员工提交
  handleSubmit = () => {
    let type = this.state.type
    let data = this.userForm.props.form.getFieldsValue() // 或者是validateFields
    // this.userForm 指的是 wrappedComponentRef 挂载到的那个对象 里面有当前对象的所有属性
    // 创建之后表单未清空，则需要在Modal弹窗的onCancel时间发生时，清空表单
    axios.ajax({
      url: type === 'add' ? '/user/add' : '/user/edit',
      data: {
        params: data
      }
    }).then((res) => {
      // 测试编辑中的表单的显示问题
      if (type === 'edit') {
        let userInfo = this.state.userInfo
        console.log('userinfo look look')
        console.log(userInfo)
        console.log('先打印data看一下')
        console.log(data)
        userInfo = Object.assign({}, {...userInfo}, data)
        console.log('合并之后')
        console.log(userInfo)
        this.setState({
          userInfo,
          isVisible: false
        })
        return
      }
      if (res.code == 0) {
        this.setState({
          isVisible: false
        })
      }
      console.log('打印当前修改项')
      console.log(this.state.userInfo)
      // this.requestList()
    })
  }



  render() {

    let footer = {}
    if (this.state.type === 'detail') {
      footer = {
        footer: null
      }
    }

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
          return sex === 1 ? '男' : '女'
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
        <Card className='operate-wrap'>
          <Button type='primary' icon='plus' onClick={() => { this.handleOperate('add')}}>创建员工</Button>
          <Button type='primary' icon='edit' onClick={() => { this.handleOperate('edit')}}>编辑员工</Button>
          <Button type='primary' onClick={() => { this.handleOperate('detail')}}>员工详情</Button>
          <Button type='danger' icon='delete' onClick={() => { this.handleOperate('delete')}}>删除员工</Button>
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

        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({
              isVisible: false
            }, () => {
              setTimeout( // 这样控制点击隐藏时 可以不让数据直接消失`
                this.userForm.props.form.resetFields
              , 500)
            })
          }}
          {...footer}
          width={600}
        >
          <UserForms
            userInfo={this.state.userInfo}
            type={this.state.type}
            wrappedComponentRef={(inst) => {this.userForm = inst}} />
        </Modal>

      </div>
    )
  }
}

class UserForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    let type = this.props.type
    let userInfo = this.props.userInfo || {}
    // 如果是水平布局 就需要用到栅格布局
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }
    return (
      <Form layout='horizontal'>
        <FormItem label='用户名' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.username :
            getFieldDecorator('username', {
              initialValue: userInfo.username
            })(
              <Input
                type='text'
                placeholder='请输入用户名'
              />
            )
          }
        </FormItem>
        <FormItem label='性别' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.sex :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.state :
              getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>🐤</Option>
                <Option value={2}>🐢</Option>
                <Option value={3}>🐒</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='生日' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.birthday :
              getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker/>
            )
          }
        </FormItem>
        <FormItem label='联系地址' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.address :
              getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <TextArea rows={3} placeholder='请输入联系地址' />
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const UserForms = Form.create()(UserForm)
