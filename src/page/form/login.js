import React from 'react'
import { Checkbox, Icon, Card, Form, Button, Input, message } from 'antd'

const FormItem = Form.Item
class Forms extends React.Component {

  handleSubmit = () => {
    // 获取表单所有的值 return obj
    let userObj = this.props.form.getFieldsValue()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userObj.userName} 恭喜您 您的密码是${userObj.password}`)
      }
    }) // 获得所有字段
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Card title='登陆行内表单'>
          <Form layout="inline">
            <FormItem>
              <Input placeholder='请输入用户账号' />
            </FormItem>
            <FormItem>
              <Input placeholder='请输入用户密码' />
            </FormItem>
            <FormItem>
              <Button type='primary'>登陆</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title='登陆水平表单'>
          <Form layout='horizontal' style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                    initialValue: 'ck',
                    rules: [
                      {
                        required: true,
                        message: '不能为空'
                      }
                    ]
                  }
                )( <Input prefix={<Icon type='plus' />} placeholder='请输入用户名'/> )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                    initialValue: '123',
                    rules: [
                      {
                        required: true,
                        message: '用户名不能为空'
                      }
                    ] // 配置表单规则
                  }
                )( <Input placeholder='请输入密码'/> )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true, // 配置表单规则
                  }
                )( <Checkbox>记住密码</Checkbox> )
              }
              <a href="#" style={{float: 'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button onClick={this.handleSubmit} type='primary'>登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create()(Forms)
