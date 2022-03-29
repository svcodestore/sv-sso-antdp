import { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllUser } from '@/services/ant-design-pro/api';
import { Badge, Tag } from 'antd';

const langMap = {
  zh_CN: '中文',
  zh_TW: '繁体中文',
  en_US: '英文',
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
  },
  {
    title: 'UUID',
    dataIndex: 'uuid',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '别名',
    dataIndex: 'alias',
  },
  {
    title: '语言',
    dataIndex: 'lang',
    render: (_, item) => {
      return <Tag color={'blue'}>{langMap[item.lang]}</Tag>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
  },
  {
    title: '修改时间',
    dataIndex: 'createdAt',
    valueType: 'date',
  },
  {
    title: '修改人',
    dataIndex: 'createdBy',
  },
];

export default () => {
  return (
    <>
      <ProTable<API.User>
        columns={columns}
        request={getAllUser}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
        options={false}
        dateFormatter={(value, valueType) => {
          console.log('====>', value, valueType);
          return value.format('YYYY-MM-DD HH:mm:ss');
        }}
      />
    </>
  );
};
