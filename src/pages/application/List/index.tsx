import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { deleteApplicationById, getAllApplication } from '@/services/api/application/application';
import { Badge, Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { Link } from 'umi';

export default () => {
  const ref = useRef<ActionType>();

  const handleDel = (id: string) => {
    deleteApplicationById(id).then(() => {
      message.success('已删除');
      ref.current?.reload();
    });
  };

  const columns: ProColumns<API.Application>[] = [
    {
      title: '编号',
      dataIndex: 'code',
      render: (_, item) => {
        return <Badge status={item.status ? 'success' : 'default'} text={item.code} />;
      },
    },
    {
      title: 'ID',
      dataIndex: 'id',

      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '内网地址',
      dataIndex: 'internalUrl',

      copyable: true,
    },
    {
      title: '外网地址',
      dataIndex: 'homepageUrl',

      copyable: true,
    },
    {
      title: '客户端ID',
      dataIndex: 'clientId',

      copyable: true,
    },
    {
      title: '客户端密钥',
      dataIndex: 'clientSecret',

      copyable: true,
    },
    {
      title: '重定向地址',
      dataIndex: 'redirectUris',

      copyable: true,
    },
    {
      title: 'Token格式',
      dataIndex: 'tokenFormat',
      width: '84px',
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
      width: '104px',
      key: 'option',
      valueType: 'option',
      render: (_, item) => [
        <Link key="edit" to={'/application/' + item.id + '?isEdit=editing'}>
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
      <ProTable<API.Application>
        actionRef={ref}
        headerTitle={'应用'}
        toolBarRender={() => [
          <Link key="button" to={'/new-application'}>
            <Button icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </Link>,
        ]}
        columns={columns}
        request={getAllApplication}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </>
  );
};
