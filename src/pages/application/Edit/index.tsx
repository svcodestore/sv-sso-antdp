import { getApplicationById, updateApplicationById } from '@/services/api/application/application';
import { Button, Form, Input, message, Select, Space } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';

const { Option } = Select;

const layout = { labelCol: { span: 2 }, wrapperCol: { span: 20 } };

export default (props: any) => {
  const { initialState } = useModel('@@initialState');

  const applicationId = props.match.params?.id as string;
  const [application, setApplication] = useState<API.Organization>();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchData = async () => {
      const o = await getApplicationById(applicationId);
      setApplication(o);
    };
    fetchData();
  }, [applicationId]);

  const o = useMemo(() => {
    return application;
  }, [application]);

  const [form] = Form.useForm();

  const onFinish = debounce((values: any) => {
    // 没有修改
    if (
      Object.values(values).every((v) => v === undefined) ||
      (Object.values(values).filter((v) => v !== undefined).length === 1 &&
        values.status === o?.status)
    ) {
      message.info('无修改');
    } else {
      const _u: Partial<API.Application> = {
        id: o?.id,
      };
      for (const key in values) {
        const v = values[key];
        if (v !== undefined) {
          if (key === 'status') {
            // @ts-ignore 兼容后端
            _u[key] = v ? '1' : '0';
          } else {
            _u[key] = v;
          }
        }
      }
      updateApplicationById(_u, initialState?.currentUser?.id as string)
        .then((res) => {
          console.log(res);
          message.success('修改成功');
          goBack();
        })
        .catch(() => {
          message.error('修改失败');
        });
    }
  }, 300);

  return (
    <>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item>
          <h2>修改应用：{o?.name}</h2>
          <Space>
            <Button htmlType="submit" type="primary">
              保存
            </Button>
            <Button onClick={goBack}>返回</Button>
          </Space>
        </Form.Item>
        <Form.Item name="name" label="应用名">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="应用编码">
          <Input />
        </Form.Item>
        <Form.Item name="internalUrl" label="内网地址">
          <Input />
        </Form.Item>
        <Form.Item name="homepageUrl" label="外网地址">
          <Input />
        </Form.Item>
        <Form.Item name="redirectUris" label="重定向地址">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select>
            <Option value={true}>激活</Option>
            <Option value={false}>停用</Option>
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};
