import { Card } from 'antd';
import React from 'react';
import { history } from 'umi';

const { Meta } = Card;

const getCardsData = () => {
  return [
    {
      cover: <img alt="organizations" src="http://192.168.123.51:50105/10001.png" />,
      meta: {
        title: '组织',
        description: '用户容器',
      },
      goto: '/organizations',
    },
    {
      cover: <img alt="users" src="http://192.168.123.51:50105/10002.png" />,
      meta: {
        title: '用户',
        description: '所有组织里的用户',
      },
      goto: '/users',
    },
    {
      cover: <img alt="OAuth提供方" src="http://192.168.123.51:50105/10003.png" />,
      meta: {
        title: '提供商',
        description: 'OAuth提供方',
      },
    },
    {
      cover: <img alt="applications" src="http://192.168.123.51:50105/10004.png" />,
      meta: {
        title: '应用',
        description: '需要鉴权的应用',
      },
      goto: '/applications',
    },
  ];
};

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {getCardsData().map(({ cover, meta, goto }) => (
        <Card
          hoverable
          key={Math.random()}
          style={{ width: 360, margin: 20 }}
          cover={cover}
          onClick={() => {
            if (goto) {
              history.replace({
                pathname: goto,
              });
            }
          }}
        >
          <Meta title={meta.title} description={meta.description} />
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
