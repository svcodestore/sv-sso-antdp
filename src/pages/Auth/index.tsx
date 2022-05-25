import { getAccessToken } from '@/services/api/oauth';
import { goSsoLogin } from '@/utils/navigate';
import { message } from 'antd';
import { useModel, history } from 'umi';

const Auth: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code') || '';
  const clientId = queryParams.get('client_id') || initialState?.currentApplication?.clientId || '';
  const redirectUris = initialState?.currentApplication?.redirectUris || '';

  getAccessToken({
    grant_type: 'authorization_code',
    client_id: clientId,
    code,
    redirect_uri: redirectUris,
  })
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      history.push('/');
    })
    .catch((msg) => {
      message.error(msg);
      goSsoLogin();
    });

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          letterSpacing: '1rem',
          fontSize: '2.5rem',
          marginBottom: '0.25rem',
        }}
      >
        认证中
      </div>
    </div>
  );
};

export default Auth;
