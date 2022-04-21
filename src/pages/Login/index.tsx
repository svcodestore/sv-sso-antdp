import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, useModel } from 'umi';
import { debounce } from 'lodash';
import { login, getGrantCode, getCurrentApplication } from '@/services/api/api';

import styles from './index.less';
import { aesEncrypt } from '@/utils/crypto';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type] = useState<string>('login');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const {
    location: { pathname, query: q },
  } = history;
  if (pathname === '/login/oauth2.0/authorize') {
    try {
      getGrantCode({
        responseType: q?.response_type as string,
        redirectUri: q?.redirect_uri as string,
        clientId: q?.client_id as string,
      }).then((res) => {
        window.location.href = (q?.redirect_uri +
          '?code=' +
          res.code +
          '&client_id=' +
          q?.client_id) as string;
      });
    } catch {
      message.error('authorize fail');
    }
  }

  getCurrentApplication().then((res) => {
    localStorage.setItem('clientId', res.clientId);
  });

  const handleSubmit = debounce(async (values: API.LoginParams) => {
    try {
      // 登录
      const data = { ...values, type };
      data.clientId = localStorage.getItem('clientId') || '';
      if (values.username) {
        data.username = aesEncrypt(values.username);
      }
      if (values.password) {
        data.password = aesEncrypt(values.password);
      }
      const msg = await login(data);
      if (msg.accessToken) {
        localStorage.setItem('accessToken', msg.accessToken);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState({ ...msg, errNameOrPassword: true });
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  }, 300);
  const { errNameOrPassword } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title={intl.formatMessage({ id: 'pages.login.accountLogin.title' })}
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {errNameOrPassword && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误',
              })}
            />
          )}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '请输入用户名',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="用户名是必填项！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="密码是必填项！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
