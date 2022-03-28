import { Card } from 'antd'
import React from 'react'
import { history } from 'umi'

const { Meta } = Card

const getCardsData = () => {
  return [
    {
      style: { width: 400 },
      cover: <img alt='example' src='https://cdn.casbin.com/static/img/organizations.png' />,
      meta: {
        title: '组织',
        description: '用户容器',
      },
      goto: '/organization',
    },
    {
      style: { width: 400 },
      cover: <img alt='example' src='https://cdn.casbin.com/static/img/users.png' />,
      meta: {
        title: '用户',
        description: '所有组织里的用户',
      },
      goto: '/user',
    },
    {
      style: { width: 400 },
      cover: <img alt='example' src='https://cdn.casbin.com/static/img/providers.png' />,
      meta: {
        title: '提供商',
        description: 'OAuth提供方',
      },
    },
    {
      style: { width: 400 },
      cover: <img alt='example' src='https://cdn.casbin.com/static/img/applications.png' />,
      meta: {
        title: '应用',
        description: '需要鉴权的应用',
      },
      goto: '/application',
    },
  ]
}

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {getCardsData().map(({ style, cover, meta, goto }) => (
        <Card
          hoverable
          key={Math.random()}
          style={style}
          cover={cover}
          onClick={() => {
            if (goto) {
              history.replace({
                pathname: goto,
              })
            }
          }}
        >
          <Meta title={meta.title} description={meta.description} />
        </Card>
      ))}
    </div>
  )
}

export default Dashboard
