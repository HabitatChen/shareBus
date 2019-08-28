import React from 'react'
import {message, Card, Button, Table, Form, Select, Modal } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import FilterForm from "../../components/city/FilterForm"
const FormItem = Form.Item
const Option = Select.Option

export default class City extends React.Component {

  state = {
    list: [],
    isShowOpenCity: false
  }

  params = {
    page: 1
  }


  componentDidMount() {
    this.request()
  }

  // 处理弹框确定按钮的提交
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue()
    axios.ajax({
      url: 'city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success('开通成功')
        this.setState({
          isShowOpenCity: false
        })
        this.request()
      }
    })
  }

  request = () => {
    let _this = this
    axios.ajax({
      url: 'open_city',
      data: {
        params: {
          page: this.params.page
        }
      }

    }).then((res) => {
      this.setState({
        list: res.result.item_list.map((item, index) => {
          item.key = index
          return item
        }),
        pagination: Utils.pagination(res, (cur) => {
          _this.params.page = cur
          _this.request()
        })
      })
    })
  }

  // 开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render: (mode) => {
          return mode == 1 ? '停车点' : '禁停区'
        }
      },{
        title: '营运模式',
        dataIndex: 'op_mode',
        render: (op_mode) => {
          return op_mode == 1 ? '停车点' : '禁停区'
        }
      },{
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },{
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr) {
          return arr.map(item => {
            return item.user_name;
          }).join(',')
        }
      },{
        title: '城市开通时间',
        dataIndex: 'open_time',
      }
      ,{
        title: '操作时间',
        dataIndex: 'update_time',
        render: (update_time) => {
          return Utils.formateDate(update_time)
        }
      },{
        title: '操作人',
        dataIndex: 'sys_user_name'
      },

    ]
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card>
          <Button type='primary' onClick={this.handleOpenCity}>开通</Button>
        </Card>
        <div className='content-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>

        <Modal
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}

        >
          <OpenCityForm wrappedComponentRef={(ref) => {this.cityForm = ref}}/>
        </Modal>

      </div>
    )
  }
}

class OpenCityFormItem extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout='horizontal'>
        <FormItem label='选择城市' {...formItemLayout}>
          {
            getFieldDecorator('city_id', {
              initialValue: ''
            })(
              <Select style={{width: 100}}>
                <Option value=''> 全部 </Option>
                <Option value='1'> 北京 </Option>
                <Option value='2'> 天津市 </Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='营运模式' {...formItemLayout}>
          {
            getFieldDecorator('op_mode', {
              initialValue: ''
            })(
              <Select style={{width: 100}}>
                <Option value='1'> 自营 </Option>
                <Option value='2'> 加盟 </Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='用车模式' {...formItemLayout}>
          {
            getFieldDecorator('mode', {
              initialValue: 1
            })(
              <Select style={{width: 100}}>
                <Option value='1'> 指定停车点 </Option>
                <Option value='2'> 禁停区 </Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const OpenCityForm = Form.create()(OpenCityFormItem)