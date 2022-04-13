import { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllOrganizationApplication } from '@/services/api/organization/organizationApplicationMap';
import { Badge, Button } from 'antd';

const columns: ProColumns<API.OrganizationApplication>[] = [
  {
    title: '组织',
    render: (_, item) => {
      return (
        <>
          <Badge status={item.status ? 'success' : 'default'} />
          <Button type="link">{item.organizationsList.name}</Button>
        </>
      );
    },
  },
  {
    title: '应用',
    render: (_, item) => {
      return <Button type="link">{item.applicationsList.name}</Button>;
    },
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
      <ProTable<API.OrganizationApplication>
        columns={columns}
        request={getAllOrganizationApplication}
        rowKey="organizationsList"
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
