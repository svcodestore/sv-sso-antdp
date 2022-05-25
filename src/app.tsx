import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { setLocale } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { Card } from 'antd';
import { getCurrentApplication } from './services/api/application/application';
import { getCurrentUser } from './services/api/user/user';

setLocale('zh-CN', false);

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  currentApplication?: API.Application;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const app = await getCurrentApplication();
  localStorage.setItem('loginUris', app.loginUris);
  localStorage.setItem('clientId', app.clientId);
  localStorage.setItem('redirectUris;', app.redirectUris);

  const fetchUserInfo = async () => {
    try {
      return await getCurrentUser();
    } catch (error) {
      return;
    }
  };
  const o = {
    fetchUserInfo,
    settings: defaultSettings,
    currentApplication: app,
  };

  if (localStorage.getItem('accessToken')) {
    const currentUser = await fetchUserInfo();
    // @ts-ignore
    o.currentUser = currentUser;
  }

  return o;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history;
      const { redirectUris } = initialState?.currentApplication || {};
      const url = new URL(redirectUris || '');
      if (initialState?.currentUser && url.pathname === location.pathname) {
        history.push('/');
      }
    },
    menuHeaderRender: undefined,
    childrenRender: (children, props) => {
      return (
        <>
          {['/dashboard', '/callback'].includes(props.location?.pathname || '') ? (
            children
          ) : (
            <Card style={{ height: 'calc(100vh - 96px)', overflow: 'auto' }}>{children}</Card>
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
