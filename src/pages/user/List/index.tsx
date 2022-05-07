import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Link, useIntl, useModel } from 'umi';

import { Badge, Button, message, Popconfirm } from 'antd';
import { delUserById, getAllUser } from '@/services/api/user/user';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';

export default () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const ref = useRef<ActionType>();

  const handleDelUser = (id: string) => {
    if (initialState?.currentUser?.id === id) {
      message.info('不能删除自己');
    } else {
      delUserById(id).then(() => {
        message.success('已删除');
        ref.current?.reload();
      });
    }
  };

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
      dataIndex: 'updatedAt',
      valueType: 'date',
    },
    {
      title: '操作',
      width: '164px',
      key: 'option',
      valueType: 'option',
      render: (_, item) => [
        <Link key="edit" to={'/user/' + item.id + '?isEdit=editing'}>
          编辑
        </Link>,
        <Popconfirm key="delete" title="确认删除吗？" onConfirm={() => handleDelUser(item.id)}>
          <a>删除</a>
        </Popconfirm>,
        <Link key={'detail'} to={'/user/' + item.id}>
          详情
        </Link>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.User>
        actionRef={ref}
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
