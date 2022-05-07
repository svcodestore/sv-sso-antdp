import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import {
  deleteOrganizationById,
  getAllOrganization,
} from '@/services/api/organization/organization';
import { Badge, Button, message, Popconfirm } from 'antd';
import { Link } from 'umi';
import { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const ref = useRef<ActionType>();

  const handleDel = (id: string) => {
    deleteOrganizationById(id).then(() => {
      message.success('已删除');
      ref.current?.reload();
    });
  };

  const columns: ProColumns<API.Organization>[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      render: (_, item) => {
        return <Badge status={item.status ? 'success' : 'default'} text={item.code} />;
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
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
        <Link key="edit" to={'/organization/' + item.id + '?isEdit=editing'}>
          编辑
        </Link>,
        <Popconfirm key="delete" title="确认删除吗？" onConfirm={() => handleDel(item.id)}>
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Organization>
        actionRef={ref}
        headerTitle={'组织'}
        toolBarRender={() => [
          <Link key="button" to={'/new-organization'}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Link>,
        ]}
        columns={columns}
        request={getAllOrganization}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </>
  );
};
