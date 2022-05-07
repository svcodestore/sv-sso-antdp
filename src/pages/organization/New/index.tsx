import { createOrganization } from '@/services/api/organization/organization';
import { Button, Form, Input, message, Space } from 'antd';
import { history, useModel } from 'umi';

const layout = { labelCol: { span: 2 }, wrapperCol: { span: 20 } };

export default () => {
  const { initialState } = useModel('@@initialState');

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    createOrganization(values, initialState?.currentUser?.id as string).then(() => {
      message.success('新增成功');
      onReset();
      history.goBack();
    });
  };

  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item>
          <Space>
            <span
              style={{
                fontSize: '20px',
              }}
            >
              新增组织
            </span>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
            <Button onClick={onReset}>重置</Button>
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
        <Form.Item name="code" label="编码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
