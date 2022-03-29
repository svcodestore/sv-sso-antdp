import React from 'react';
import { Button } from 'antd';
import { updateUser } from '@/services/api/api';
import { aesEncrypt } from '@/utils/crypto';

const doRegist = async () => {
  await updateUser(
    {
      id: '1',
      loginId: aesEncrypt('test'),
      password: aesEncrypt('111'),
      name: 'test person',
      lang: 'zh_CN',
      status: false,
    },
    '0',
  ).then((res) => {
    console.log(res, 'updateUser');
  });
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <Button type="primary" onClick={doRegist}>
        updateUser
      </Button>
    </div>
  );
};

export default Dashboard;
