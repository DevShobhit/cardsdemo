import { Form, Input, Modal, Select, Checkbox } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux/es/exports'

const CardModal = ({ visible, onCreate, onCancel, type, fields = {} }) => {
  const [form] = Form.useForm()
  const [checked, setChecked] = useState(false)
  const buckets = useSelector((state) => state.buckets)

  return (
    <Modal
      visible={visible}
      title={type === 'create' ? 'Create A New Card' : 'Edit the Card'}
      okText={type === 'create' ? 'Create' : 'Update'}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values, checked)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} layout='vertical' name='card_modal'>
        <Form.Item
          name='cardName'
          label='Card Name'
          initialValue={fields.name}
          rules={[
            {
              required: true,
              message: 'Please input the name of card!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='link'
          label='URL'
          initialValue={fields.link}
          rules={[{ required: true, message: 'Please enter a valid URL' }]}
        >
          <Input type='url' />
        </Form.Item>
        {type !== 'edit' ? (
          <>
            <Checkbox onChange={() => setChecked(!checked)}>
              Create New Bucket
            </Checkbox>

            {checked ? (
              <Form.Item
                name='bucket'
                label='Bucket Name'
                // initialValue={fields.bucket}
                style={{ paddingTop: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid Bucket Name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : (
              <Form.Item
                name='bucket'
                label='Bucket Name'
                // initialValue={fields.bucket}
                style={{ paddingTop: '10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Please Select a valid bucket or create a new one',
                  },
                ]}
              >
                <Select>
                  {buckets.map((bucket) => (
                    <Select.Option
                      value={bucket.name}
                      key={bucket + Math.random()}
                    >
                      {bucket.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </>
        ) : (
          <Form.Item
            name='bucket'
            label='Move To'
            style={{ paddingTop: '10px' }}
            rules={[
              {
                message: 'Please Select a valid bucket',
              },
            ]}
          >
            <Select defaultValue={fields.bucket}>
              {buckets.map((bucket) => (
                <Select.Option value={bucket.name} key={bucket + Math.random()}>
                  {bucket.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default CardModal
