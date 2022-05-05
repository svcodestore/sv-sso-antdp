import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Link, useIntl } from 'umi';

import { Badge, Button } from 'antd';
import { getAllUser } from '@/services/api/user/user';
import { PlusOutlined } from '@ant-design/icons';

const columns: ProColumns<API.User>[] = [
  {
    title: '帐号',
    dataIndex: 'loginId',
    render: (_, item) => {
      return <Badge status={item.status ? 'success' : 'default'} text={item.loginId} />;
    },
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '密码',
    dataIndex: 'password',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '修改时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '操作',
    width: '164px',
    key: 'option',
    valueType: 'option',
    render: (_, item) => [
      <a key="link">编辑</a>,
      <a key="link2">删除</a>,
      <Link key={'detail'} to={'/user/' + item.id}>
        详情
      </Link>,
    ],
  },
];

export default () => {
  const intl = useIntl();
  return (
    <>
      <ProTable<API.User>
        headerTitle={intl.formatMessage({
          id: 'pages.user.table.title',
          defaultMessage: '用户',
        })}
        toolBarRender={() => [
          <Link key="button" to={'/new-user'}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Link>,
        ]}
        columns={columns}
        request={getAllUser}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </>
  );
};
