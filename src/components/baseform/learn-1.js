import React from 'react'
import {Form, Select, Button, DatePicker} from "antd"
const FormItem = Form.Item
const Option = Select.Option

class LearnReact extends React.Component {
  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    let formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach(item => {
        let {placeholder, type, field, initialValue, width} = item
        // 如果是Select的类型 需要调用一下options生成器
        if (type === 'SELECT') {
          const SELECT =
            <FormItem >
              {
                getFieldDecorator([field], {
                  initialValue
                })(
                  <Select
                    placeholder={placeholder}
                    style={{width: width}}
                  >
                    {
                      item.list.map(childItem => {
                        return <Option value={childItem.id}>
                          {childItem.name}
                        </Option>
                      })
                    }
                  </Select>
                )
              }
            </FormItem>
          formItemList.push(SELECT)
        }
      })
    }
    return formItemList
  }
  render() {
    return (
      <Form layout='inline'>
        {this.initFormList()}
      </Form>
    )
  }
}

export default Form.create()(LearnReact)