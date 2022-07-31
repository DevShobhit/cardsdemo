import { Form, Input, Modal } from 'antd'

export const BucketModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title='Create a new bucket'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} layout='vertical' name='bucketForm'>
        <Form.Item
          name='BucketName'
          label='BucketName'
          rules={[
            {
              required: true,
              message: 'Please input the bucket name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BucketModal
