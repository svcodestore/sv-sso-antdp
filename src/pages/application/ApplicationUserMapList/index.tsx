import { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { getAllApplicationUser } from '@/services/api/application/applicationUserMap';
import { Badge, Button } from 'antd';

const columns: ProColumns<API.ApplicationUser>[] = [
  {
    title: '应用',
    render: (_, item) => {
      return (
        <>
          <Badge status={item.status ? 'success' : 'default'} />
          <Button type="link">{item.applicationsList.name}</Button>
        </>
      );
    },
  },
  {
    title: '用户',
    render: (_, item) => {
      return <Button type="link">{item.usersList.name}</Button>;
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
      <ProTable<API.ApplicationUser>
        columns={columns}
        request={getAllApplicationUser}
        rowKey="applicationsList"
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
