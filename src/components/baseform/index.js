import React from 'react'
import {DatePicker, Input, Select, Form, Button, Checkbox, Radio} from "antd"
import Util from '../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {

  // 绑定过滤方法
  handleFilterSubmit = () => {
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
          const INPUT = <FormItem width={width} label={label} key={field} >
            {
              getFieldDecorator([field], {
                initialValue: initValue,
              })(
                <INPUT
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
          const CHECKBOX = <FormItem label={label} key={field} >
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
        if (item.type == '时间查询') {
          const begin_time = <FormItem label='开始时间' key={field}>
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
          const end_time = <FormItem label="~" colon={false} key={field}>
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