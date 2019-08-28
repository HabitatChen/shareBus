import React from 'react'
import { Form, Select, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form layout="inline">
          <FormItem width={200} label='城市'>
            {
              getFieldDecorator('state', {
                initialValue: '2'
              })(
                <Select>
                  <Option value='1'> 北京市 </Option>
                  <Option value='2'> 杭州市 </Option>
                  <Option value='3'> 三门县 </Option>
                  <Option value='4'> 海邮政 </Option>
                  <Option value='5'> 你好 </Option>
                </Select>
              )
            }
          </FormItem><FormItem width={200} label='用车模式'>
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
          </FormItem><FormItem width={200} label='营运模式'>
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
          </FormItem><FormItem width={200} label='加盟商授权状态'>
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
          <FormItem>
            <Button type='primary'>查询</Button>
            <Button >重置</Button>
          </FormItem>

        </Form>

      </div>
    )
  }
}

export default Form.create()(FilterForm)
