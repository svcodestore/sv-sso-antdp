import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import {
  deleteApplicationUserById,
  getAllApplicationUser,
} from '@/services/api/application/applicationUserMap';
import { Badge, Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { Link } from 'umi';

export default () => {
  const ref = useRef<ActionType>();

  const handleDel = (aid: string, uid: string) => {
    deleteApplicationUserById(aid, uid).then(() => {
      message.success('已删除');
      ref.current?.reload();
    });
  };

  const columns: ProColumns<API.ApplicationUser>[] = [
    {
      title: '应用',
      render: (_, item) => {
        return (
          <>
            <Badge status={item.status ? 'success' : 'default'}>{item.applicationsList.name}</Badge>
          </>
        );
      },
    },
    {
      title: '用户',
      render: (_, item) => {
        return <>{item.usersList.name}</>;
      },
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
      width: '64px',
      key: 'option',
      valueType: 'option',
      render: (_, item) => [
        <Popconfirm
          key="delete"
          title="确认删除吗？"
          onConfirm={() => handleDel(item.applicationsList.id, item.usersList.id)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.ApplicationUser>
        actionRef={ref}
        headerTitle={'应用-用户'}
        toolBarRender={() => [
          <Link key="button" to={'/new-application-map-user'}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Link>,
        ]}
        columns={columns}
        request={getAllApplicationUser}
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </>
  );
};
