import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllOrganization } from '@/services/api/organization/organization';
import { Badge } from 'antd';

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
    dataIndex: 'createdAt',
    valueType: 'date',
  },
];

export default () => {
  return (
    <>
      <ProTable<API.Organization>
        columns={columns}
        request={getAllOrganization}
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
