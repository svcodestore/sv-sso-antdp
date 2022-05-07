import { AutoComplete, Button, Form, Input, message, Space } from 'antd';
import type { SelectProps } from 'antd';
import { useState } from 'react';
import { history, useModel } from 'umi';
import { getAllApplication } from '@/services/api/application/application';
import { createApplicationUser } from '@/services/api/application/applicationUserMap';
import { getAllUser } from '@/services/api/user/user';

const layout = { labelCol: { span: 2 }, wrapperCol: { span: 20 } };

export default () => {
  const { initialState } = useModel('@@initialState');

  const [form] = Form.useForm();
  const [users, setUsers] = useState<API.User[]>();
  const [applications, setApplications] = useState<API.Application[]>();

  const searchUserResult = async (query: string) => {
    const { data } = await getAllUser();
    const list = data
      .filter((e) => e.status)
      .filter(
        (e) =>
          e.loginId.toUpperCase().indexOf(query.toUpperCase()) > -1 ||
          e.name.toUpperCase().indexOf(query.toUpperCase()) > -1,
      );

    setUsers(list);
    return list.map((e) => {
      return {
        value: e.name,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{e.loginId}</span>
            <span>{e.name}</span>
          </div>
        ),
      };
    });
  };

  const searchApplicationResult = async (query: string) => {
    const { data } = await getAllApplication();
    const list = data
      .filter((e) => e.status)
      .filter(
        (e) =>
          e.code.toUpperCase().indexOf(query.toUpperCase()) > -1 ||
          e.name.toUpperCase().indexOf(query.toUpperCase()) > -1,
      );

    setApplications(list);
    return list.map((e) => {
      return {
        value: e.name,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{e.code}</span>
            <span>{e.name}</span>
          </div>
        ),
      };
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = ({
    applicationName,
    userName,
  }: {
    applicationName: string;
    userName: string;
  }) => {
    const applicationId = applications?.find((e) => e.name === applicationName)?.id;
    if (!applicationId) {
      message.info(`暂无应用：${applicationName}，请先添加`);
      return;
    }
    const userId = users?.find((e) => e.name === userName)?.id;
    if (!userId) {
      message.info(`暂无用户：${userName}，请先添加`);
      return;
    }

    createApplicationUser(applicationId, userId, initialState?.currentUser?.id as string).then(
      () => {
        message.success('新增成功');
        onReset();
        history.goBack();
      },
    );
  };

  const [userOptions, setUserOptions] = useState<SelectProps<object>['options']>([]);
  const [applicationOptions, setApplicationOptions] = useState<SelectProps<object>['options']>([]);

  const handleUserSearch = async (value: string) => {
    setUserOptions(value ? await searchUserResult(value) : []);
  };
  const handleApplicationSearch = async (value: string) => {
    setApplicationOptions(value ? await searchApplicationResult(value) : []);
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
              新增「应用-用户」
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
        <Form.Item name="applicationName" label="应用" rules={[{ required: true }]}>
          <AutoComplete options={applicationOptions} onSearch={handleApplicationSearch}>
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="userName" label="用户" rules={[{ required: true }]}>
          <AutoComplete options={userOptions} onSearch={handleUserSearch}>
            <Input />
          </AutoComplete>
        </Form.Item>
      </Form>
    </>
  );
};
