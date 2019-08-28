import React from 'react'
import moment from 'moment'
import {
  Card,
  Form,
  Radio,
  InputNumber,
  Select,
  Button,
  Input,
  Checkbox,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  message } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { Option } = Select
const { TextArea } = Input

class SignUp extends React.Component {

  state = {
    imgUrl: ''
  }

  handleClick = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // labelCol 和 wrapper是成对出现的
    const formItemLayout = {
      labelCol: {
        xs: 24, // 响应式 超小号时独占一行
        sm: 4   // 如果 > 576 时 label占4格
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayout = {
      wrapperCol: {
        sm: {
          span: 12,
          offset: 4
        }

      }
    }
    return (
      <div>
        <Card title='注册'>
          <Form >
            <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: 'habitat',
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名'
                    }
                  ]
                })( <Input placeholder='用户名' />)
              }
            </FormItem>
            <FormItem label='密码' {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名'
                    }
                  ]
                })( <Input placeholder='请输入密码' />)
              }
            </FormItem>
            <FormItem {...formItemLayout} label='性别'>
              {
                getFieldDecorator('sex', {
                  initialValue: ''
                })(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='年龄'>
              {
                getFieldDecorator('age',{
                  initialValue: '1'
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='当前状态'>
              {
                getFieldDecorator('state', {
                  initialValue: '2'
                })(
                  <Select>
                    <Option value='1'> 一条咸鱼 </Option>
                    <Option value='2'> 二条咸鱼 </Option>
                    <Option value='3'> 三条咸鱼 </Option>
                    <Option value='4'> 四条咸鱼 </Option>
                    <Option value='5'> 五️条咸鱼 </Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='爱好'>
              {
                getFieldDecorator('hobby', {
                  initialValue: ['1', '2', '3']
                })(
                  <Select mode='multiple'>
                    <Option value='1'>摸鱼1</Option>
                    <Option value='2'>摸鱼2</Option>
                    <Option value='3'>摸鱼3</Option>
                    <Option value='4'>摸鱼4</Option>
                    <Option value='5'>摸鱼5</Option>
                    <Option value='6'>摸鱼6</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='是否已婚'>
              {
                getFieldDecorator('married', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Switch />
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='出生年月'>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2019-08-08')
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"

                  />
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='联系地址'>
              {
                getFieldDecorator('address', {
                  initialValue: ''
                })(
                  <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='早起时间'>
              {
                getFieldDecorator('early-time')(
                  <TimePicker/>
                )
              }
            </FormItem>
            <FormItem {...formItemLayout} label='上传头像'>
              {
                getFieldDecorator('avatar', {

                })(
                  <Upload
                    action='#'
                    showUploadList={false}
                    listType='picture-card'
                  >
                    {
                      this.state.imgUrl ? <img src={this.state.imgUrl} /> : <Icon type='plus' />
                    }

                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('already-read', {
                  initialValue: true,
                  valuePropName: 'checked'
                })(
                  <Checkbox>
                    我已经阅读
                    <a href='#'>阿慕课地址</a>
                  </Checkbox>
                )
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button
                type='primary'
                onClick={this.handleClick}
              >注册</Button>
            </FormItem>

          </Form>
        </Card>
      </div>
    )
  }
}

const FormSignUp = Form.create()(SignUp)

export default FormSignUp
