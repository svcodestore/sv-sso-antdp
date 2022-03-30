import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllApplication } from '@/services/api/application/application';
import { Badge } from 'antd';

const columns: ProColumns<API.Application>[] = [
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
    title: '内网地址',
    dataIndex: 'internalUrl',
  },
  {
    title: '外网地址',
    dataIndex: 'externalUrl',
  },
  {
    title: '客户端ID',
    dataIndex: 'clientId',
  },
  {
    title: '客户端密钥',
    dataIndex: 'clientSecret',
  },
  {
    title: '重定向地址',
    dataIndex: 'redirectUris',
  },
  {
    title: 'token格式',
    dataIndex: 'tokenFormat',
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
];

export default () => {
  return (
    <>
      <ProTable<API.Application>
        columns={columns}
        request={getAllApplication}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
        options={false}
        dateFormatter={(value) => {
          return value.format('YYYY-MM-DD HH:mm:ss');
        }}
      />
    </>
  );
};
