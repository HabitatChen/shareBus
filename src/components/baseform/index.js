import React from 'react'
import {DatePicker, Input, Select, Form, Button, Checkbox, Radio} from "antd"
import Util from '../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {

  // 绑定过滤方法
  handleFilterSubmit = () => {
    // 在组件内部获取到这个值 通过调用父组件的方法 然后把值传到父组件
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue) // 父子组件通信 儿子调用父亲传递的方法
  }

  // 重置
  reset = () => {
    this.props.form.resetFields()
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label
        let field = item.field
        let initValue = item.initialValue || ''
        let placeholder = item.placeholder
        let width = item.width
        if (item.type == 'SELECT') {
          const SELECT = <FormItem label={label} key={field} >
            {
              getFieldDecorator([field], {
                initialValue: initValue,
              })(
                <Select
                  style={{width: width}}
                  placeholder={placeholder}
                >
                  {
                    Util.getOptionList(item.list)
                  }
                </Select>
              )
            }
          </FormItem>
          formItemList.push(SELECT)
        }
        if (item.type == 'INPUT') {
          var INPUT = <FormItem width={width} label={label} key={field} >
            {
              getFieldDecorator([field], {
                initialValue: initValue,
              })(
                <Input
                  type='text'
                  placeholder={placeholder}
                  width={width}
                />
              )
            }
          </FormItem>
          formItemList.push(INPUT)
        }
        if (item.type == 'CHECKBOX') {
          let CHECKBOX = <FormItem label={label} key={field} >
            {
              getFieldDecorator([field], {
                initialValue: initValue, // 必须是 true or false
                valuePropName: 'checked' // 一定要加这个属性
              })(
                <Checkbox >
                  {label}
                </Checkbox>
              )
            }
          </FormItem>
          formItemList.push(CHECKBOX)
        }
        if (item.type == 'DATE') {
          var Dater = <FormItem label={label} key={field} >
            {
              getFieldDecorator([field], {})(
                <DatePicker
                  placeholder={placeholder}
                  showTime={true}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
            }

          </FormItem>
          formItemList.push(Dater)
        }
        if (item.type == '城市') {
          let city = <FormItem label='城市' key='city'>
            {
              getFieldDecorator('city', {
                initialValue: '0'
              })(
                <Select
                  style={{width: 80}}
                >
                  {Util.getOptionList(
                    [
                      {id: '0', name: '全部'},
                      {id: '1', name: '北京'},
                      {id: '2', name: '天津'},
                      {id: '3', name: '杭州'}
                      ]
                  )}
                </Select>
              )
            }
          </FormItem>

          formItemList.push(city)
        }
        if (item.type == '时间查询') {
          let begin_time = <FormItem label='开始时间' key={field}>
            {
              getFieldDecorator('begin_time', {
              })(
                <DatePicker
                  placeholder={placeholder}
                  showTime={true}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
            }
          </FormItem>
          formItemList.push(begin_time)
          let end_time = <FormItem label="~" colon={false} key={field}>
            {
              getFieldDecorator('end_time', {
              })(
                <DatePicker
                  placeholder={placeholder}
                  showTime={true}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )
            }
          </FormItem>
          formItemList.push(end_time)
        }
      })
    }
    return formItemList
  }

  render() {
    return (
      <Form layout='inline'>
        {
          this.initFormList()
        }
        <FormItem>
          <Button type='primary' onClick={this.handleFilterSubmit}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(FilterForm)