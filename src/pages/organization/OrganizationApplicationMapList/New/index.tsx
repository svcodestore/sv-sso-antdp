import { createOrganizationApplication } from '@/services/api/organization/organizationApplicationMap';
import { AutoComplete, Button, Form, Input, message, Space } from 'antd';
import type { SelectProps } from 'antd';
import { useState } from 'react';
import { history, useModel } from 'umi';
import { getAllOrganization } from '@/services/api/organization/organization';
import { getAllApplication } from '@/services/api/application/application';

const layout = { labelCol: { span: 2 }, wrapperCol: { span: 20 } };

export default () => {
  const { initialState } = useModel('@@initialState');

  const [form] = Form.useForm();
  const [organizations, setOrganizations] = useState<API.Organization[]>();
  const [applications, setApplications] = useState<API.Application[]>();

  const searchOrganizationResult = async (query: string) => {
    const { data } = await getAllOrganization();
    const list = data
      .filter((e) => e.status)
      .filter(
        (e) =>
          e.code.toUpperCase().indexOf(query.toUpperCase()) > -1 ||
          e.name.toUpperCase().indexOf(query.toUpperCase()) > -1,
      );

    setOrganizations(list);
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
    organizationName,
    applicationName,
  }: {
    organizationName: string;
    applicationName: string;
  }) => {
    const organizationId = organizations?.find((e) => e.name === organizationName)?.id;
    if (!organizationId) {
      message.info(`暂无组织：${organizationName}，请先添加`);
      return;
    }
    const applicationId = applications?.find((e) => e.name === applicationName)?.id;
    if (!applicationId) {
      message.info(`暂无应用：${applicationName}，请先添加`);
      return;
    }

    createOrganizationApplication(
      organizationId,
      applicationId,
      initialState?.currentUser?.id as string,
    ).then(() => {
      message.success('新增成功');
      onReset();
      history.goBack();
    });
  };

  const [organizationOptions, setOrganizationOptions] = useState<SelectProps<object>['options']>(
    [],
  );
  const [applicationOptions, setApplicationOptions] = useState<SelectProps<object>['options']>([]);

  const handleOrganizationSearch = async (value: string) => {
    setOrganizationOptions(value ? await searchOrganizationResult(value) : []);
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
              新增「组织-应用」
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
        <Form.Item name="organizationName" label="组织" rules={[{ required: true }]}>
          <AutoComplete options={organizationOptions} onSearch={handleOrganizationSearch}>
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="applicationName" label="应用" rules={[{ required: true }]}>
          <AutoComplete options={applicationOptions} onSearch={handleApplicationSearch}>
            <Input />
          </AutoComplete>
        </Form.Item>
      </Form>
    </>
  );
};
