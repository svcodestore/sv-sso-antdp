import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import {
  deleteOrganizationApplicationById,
  getAllOrganizationApplication,
} from '@/services/api/organization/organizationApplicationMap';
import { Badge, Button, message, Popconfirm } from 'antd';
import { useRef } from 'react';
import { Link } from 'umi';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const ref = useRef<ActionType>();

  const handleDel = (oid: string, aid: string) => {
    deleteOrganizationApplicationById(oid, aid).then(() => {
      message.success('已删除');
      ref.current?.reload();
    });
  };

  const columns: ProColumns<API.OrganizationApplication>[] = [
    {
      title: '组织',
      render: (_, item) => {
        return (
          <>
            <Badge status={item.status ? 'success' : 'default'}>
              {item.organizationsList.name}
            </Badge>
          </>
        );
      },
    },
    {
      title: '应用',
      render: (_, item) => {
        return <>{item.applicationsList.name}</>;
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
          onConfirm={() => handleDel(item.organizationsList.id, item.applicationsList.id)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];
  return (
    <>
      <ProTable<API.OrganizationApplication>
        actionRef={ref}
        headerTitle={'组织-应用'}
        toolBarRender={() => [
          <Link key="button" to={'/new-organization-map-application'}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Link>,
        ]}
        columns={columns}
        request={getAllOrganizationApplication}
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </>
  );
};
