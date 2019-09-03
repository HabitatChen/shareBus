import React from 'react'
import {Transfer ,Tree, message, Modal, Card, Button, Table, Form, Input, Radio, Select, DatePicker} from 'antd'
import axios from "../../axios"
import Utils from './../../utils/utils'
import moment from "moment"
import data from './../../config/menuConfig'
import {dimValueGetter} from "echarts/src/component/marker/markerHelper"

const FormItem = Form.Item
const Option = Select.Option
const { TreeNode } = Tree;

export default class Permission extends React.Component{

  state = {
    list: [],
    selectedRowKeys: '',
    selectedRowItem: {},
    showModal: false,
    isPermissionVisible: false,
    detailInfo: {},
    menuInfo: [],
    isUserVisible: false,
    mockData: [],
    targetKeys: []
  }

  params = {
    page: 1,
    params: {}
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/role/list', this.params)
  }

  onRowClick = (record, index) => {
    let selectedRowKeys = [index]
    this.setState({
      selectedRowKeys,
      selectedRowItem: record
    })
  }

  handleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue()
    console.log(data)
    axios.ajax({
      url: 'role/create',
      data: {
        params: data
      }
    }).then((res) => {
      // 成功之后首先关闭弹框 然后去重新刷新列表
      if (res.code == '0') {
        message.success('创建成功')
        this.setState({
          showModal: false
        }, () => {
          setTimeout(() => {
            this.roleForm.props.form.resetFields() // 关闭弹窗时表单重置
          }, 500)
        })
      }
      this.requestList()
    })


  }

  handleCreateRole = () => {
    this.setState({
      showModal: true
    })
  }

  // 权限设置
  handlePermission = () => {
    let item = this.state.selectedRowItem
    if (Object.keys(item).length === 0) {
      Modal.info({
        title: '提示',
        content: '请选择一个用户'
      })
      return
    }
    this.setState({
      isPermissionVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  // 权限设置的提交
  handlePermissionSubmit = () => {
    let data = this.permissionForm.props.form.getFieldsValue()
    data.role_id = this.state.selectedRowItem.id
    data.menus = this.state.menuInfo
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          isPermissionVisible: false
        })
        this.requestList()
      }
    })
  }

  // 用户授权
  handleUserAuth = () => {
    let item = this.state.selectedRowItem
    if (Object.keys(item).length === 0) {
      Modal.info({
        title: '提示',
        content: '请选择一个用户'
      })
      return
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id)

  }

  // 通过角色id 获得用户名
  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id
        }
      }
    }).then((res) => {
      if (res) {

        this.getAuthUserList(res.result)
      }
    })
  }

  // 筛选用户
  getAuthUserList = (data) => {
    const mockData = []
    const targetKeys = []
    console.log('data')
    console.log(data)
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let dataObj = {
          key: data[i].user_id,
          title: data[i].user_name,
          status: data[i].status
        }
        if (data[i].status == 1) {
          targetKeys.push(dataObj.key)
        }
        mockData.push(dataObj)
      }
      this.setState({
        mockData: mockData,
        targetKeys: targetKeys
      })
    }
  }

  // 用户授权表单的提交
  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedRowItem.id
    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res) {
        this.setState({
          isUserVisible: false
        })
      }
      this.requestList()
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '角色状态',
        dataIndex: 'status',
        render: (state) => {
          return {
            '1': '启用',
            '0': '停用',
          }[state]
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]
    const { list, selectedRowKeys, showModal, isPermissionVisible, detailInfo, menuInfo } = this.state
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('on change selectedRowKeys')
        console.log(selectedRowKeys)
        let ids = []
        selectedRows.map(item => {
          ids.push(item.id)
        })
        this.setState({
          selectedRowKeys, // 这个是必须的
        //  selectedIds: ids, // 附加的
        //  selectedRows: selectedRows // 多选时 把选中的所有数据存起来 方便管理 onRow 会存单条数据
        })
      }
    }
    return (
      <div>
        <Card
          title='权限管理'
        >
          <Button type='primary' onClick={this.handleCreateRole}>创建角色</Button>
          <Button type='primary' onClick={this.handlePermission}>设置权限</Button>
          <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <Table
            columns={columns}
            dataSource={list}
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
          title='创建角色'
          visible={showModal}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields() // 关闭弹窗时表单重置
            this.setState({showModal: false})}
          }
        >
          <CreateRoleForm wrappedComponentRef={(inst) => {this.roleForm = inst}}/>
        </Modal>
        <Modal
          title='设置权限'
          visible={isPermissionVisible}
          width={600}
          onOk={this.handlePermissionSubmit}
          onCancel={() => {
            this.setState({
              isPermissionVisible: false,
            }, () => {
              this.permissionForm.props.form.resetFields()
            })
          }}

        >
          <PermissionEditForms
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              })
            }}
            detailInfo={detailInfo}
            menuInfo={menuInfo}
            wrappedComponentRef={(inst) => {this.permissionForm = inst}}
          />
        </Modal>
        <Modal
          title='用户授权'
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForms
            detailInfo={detailInfo}
            wrappedComponentRef={(inst) => {this.userAuthForm = inst}}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
            />
        </Modal>
      </div>
    )
  }
}


class CreateUserForm extends React.Component {
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
        <FormItem label='角色名称' {...formItemLayout}>
          {
            type === 'role_name' ? userInfo.username :
              getFieldDecorator('role_name', {
              })(
                <Input
                  type='text'
                  placeholder='请输入角色名称'
                />
              )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.state :
              getFieldDecorator('state', {
              })(
                <Select>
                  <Option value={0}>关闭</Option>
                  <Option value={1}>开启</Option>
                </Select>
              )
          }
        </FormItem>
      </Form>
    )
  }
}

const CreateRoleForm = Form.create()(CreateUserForm)

class PermissionEditForm extends React.Component {

  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          { this.renderTreeNodes(item.children) }
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key} />
      }
    })
  }

  onChenck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { detailInfo, menuInfo } = this.props //263125
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }
    return (
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout} >
          <Input
            placeholder={detailInfo.role_name}
            disabled
          />
        </FormItem>
        <FormItem label='状态' {...formItemLayout} >
          {
            getFieldDecorator('status', {
              initialValue: '0'
            })(
              <Select>
                <Option value='0'>停用</Option>
                <Option value='1'>启用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys) => {
            this.onChenck(checkedKeys)
          }}
          checkedKeys={menuInfo}

        >
          <TreeNode title='平台权限' key='permission_all'>
            {
              this.renderTreeNodes(data)
            }
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
const PermissionEditForms = Form.create()(PermissionEditForm)

class RoleAuthForm extends React.Component {

  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  componentDidMount() {
    console.log('targetKeys')
    console.log(this.props.targetKeys)
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { detailInfo, menuInfo } = this.props //263125
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 15}
    }
    return (
      <Form>
        <FormItem label='角色名称' {...formItemLayout} >
          <Input
            placeholder={detailInfo.role_name}
            disabled
          />
          <FormItem style={{marginTop: 30}}>
            <Transfer
              listStyle={{width: 200, height: 400}}
              dataSource={this.props.mockData}
              targetKeys={this.props.targetKeys}
              titles={['待选用户', '已选用户']}
              showSearch
              searchPlaceholder='输入用户名'
              filterOption={this.filterOption}
              onChange={this.handleChange}
              render={(item) => item.title}
            />
          </FormItem>

        </FormItem>
      </Form>
    )
  }
}

const RoleAuthForms = Form.create()(RoleAuthForm)
