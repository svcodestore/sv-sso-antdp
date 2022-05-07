import { getUserById, updateUserById } from '@/services/api/user/user';
import { toChinaDatetime } from '@/utils/date';
import { Button, Descriptions, Form, Input, message, Select, Space, Switch, Tag } from 'antd';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { history, useModel } from 'umi';

const { Option } = Select;

const layout = { labelCol: { span: 2 }, wrapperCol: { span: 20 } };

export default (props: any) => {
  const { initialState } = useModel('@@initialState');

  const userId = props.match.params?.id as string;
  const [isEdit, setIsEdit] = useState('');
  const [isFromEdit, setIsFromEdit] = useState(false);
  const [user, setUser] = useState<API.User>();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const fetchData = async () => {
      const u = await getUserById(userId);
      setUser(u);
    };
    fetchData();
    const _isEdit = props.location?.query?.isEdit;
    setIsEdit(props.location?.query?.isEdit);
    setIsFromEdit(_isEdit === 'editing');
  }, [userId, props.location?.query?.isEdit]);

  const u = useMemo(() => {
    return user;
  }, [user]);

  const [form] = Form.useForm();

  const onFinish = debounce((values: any) => {
    // 没有修改
    if (
      Object.values(values).every((v) => v === undefined) ||
      (Object.values(values).filter((v) => v !== undefined).length === 1 &&
        values.status === u?.status)
    ) {
      message.info('无修改');
    } else {
      const _u: Partial<API.User> = {
        id: u?.id,
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
      updateUserById(_u, initialState?.currentUser?.id as string)
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
      {isEdit !== 'editing' && (
        <Descriptions
          title={
            <>
              <Space>
                用户详情
                <Button onClick={goBack}>返回</Button>
                <Switch
                  checked={isEdit === 'editing'}
                  checkedChildren="编辑"
                  unCheckedChildren="浏览"
                  onChange={(v) => {
                    const status = v ? 'editing' : '';
                    setIsEdit(status);
                  }}
                />
              </Space>
            </>
          }
        >
          <Descriptions.Item label="名称">{u?.name}</Descriptions.Item>
          <Descriptions.Item label="帐号">{u?.loginId}</Descriptions.Item>
          <Descriptions.Item label="状态">
            {u?.status ? <Tag color="green">已激活</Tag> : <Tag color="gray">已停用</Tag>}{' '}
          </Descriptions.Item>
          <Descriptions.Item label="ID">{u?.id}</Descriptions.Item>
          <Descriptions.Item label="UUID">{u?.uuid}</Descriptions.Item>
          <Descriptions.Item label="头像">-</Descriptions.Item>
          <Descriptions.Item label="昵称">{u?.alias || '-'}</Descriptions.Item>
          <Descriptions.Item label="语言">{u?.lang}</Descriptions.Item>
          <Descriptions.Item label="密码">{u?.password}</Descriptions.Item>
          <Descriptions.Item label="手机">{u?.phone || '-'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{u?.email || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建人">{u?.createdByUser?.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {(u?.createdAt && toChinaDatetime(u?.createdAt)) || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="修改时间">
            {(u?.updatedAt && toChinaDatetime(u?.updatedAt)) || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="修改人">{u?.updatedByUser?.name || '-'}</Descriptions.Item>
        </Descriptions>
      )}
      {isEdit === 'editing' && (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item>
            <h2>修改用户：{u?.name}</h2>
            <Space>
              <Button htmlType="submit" type="primary">
                保存
              </Button>
              <Button
                onClick={() => {
                  if (isFromEdit) {
                    goBack();
                  } else {
                    setIsEdit('');
                  }
                }}
              >
                返回
              </Button>
              <Switch
                checked={isEdit === 'editing'}
                checkedChildren="编辑"
                unCheckedChildren="浏览"
                onChange={(v) => {
                  const status = v ? 'editing' : '';
                  setIsEdit(status);
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item name="loginId" label="帐号">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select>
              <Option value={true}>激活</Option>
              <Option value={false}>停用</Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
