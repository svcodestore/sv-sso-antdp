import React from 'react'
import { Button } from 'antd'
import { registUser } from '@/services/ant-design-pro/api'
import { aesEncrypt } from '@/utils/crypto'

const doRegist = async () => {
  await registUser({
    loginId: aesEncrypt('test'),
    password: aesEncrypt('111'),
    name: 'test person',
    lang: 'ZH_CN',
  }).then(res => {
    console.log(res, 'regist')
  })
}

const Dashboard: React.FC = () => {
  return (
    <div>
      <Button type='primary' onClick={doRegist}>
        Register
      </Button>
    </div>
  )
}

export default Dashboard
