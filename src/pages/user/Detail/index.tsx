// export default (props: any) => {
//   const userId = props.match.params?.id as string;
//   getUserById(userId).then((user) => {
//     console.log(user);
//   });
//   return <>{userId}</>;
// };

// import { getUserById } from '@/services/api/user/user';
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
    message.success('onFinish');
    console.log(initialState?.currentUser?.id, values);
    // createUser(values, initialState?.currentUser?.id as string).then(() => {
    //   message.success('新增成功');
    //   onReset();
    //   history.goBack();
    // });
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
              新增用户
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
        <Form.Item
          name="loginId"
          label="帐号"
          rules={[
            { required: true },
            {
              validator: (_, v) => {
                if (v?.length > 3) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: '请输入大于3位数的帐号',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};
