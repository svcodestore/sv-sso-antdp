import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { setLocale } from 'umi';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';
import { Card } from 'antd';
import { getCurrentApplication } from './services/api/application/application';
import { getCurrentUser } from './services/api/user/user';
import { getMenus } from './services/api/menu';
import { sortMenuDataItems, toMenuDataItems } from './utils/menu';
import { DashboardOutlined } from '@ant-design/icons';
import { goSsoLogin } from './utils/navigate';

setLocale('zh-CN', false);

const iconMaps = {
  dashboard: <DashboardOutlined />,
};

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
  menus?: API.Menu[];
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const app = await getCurrentApplication();
  localStorage.setItem('applicationId', app.id);
  localStorage.setItem('loginUris', app.loginUris);
  localStorage.setItem('clientId', app.clientId);
  localStorage.setItem('redirectUris', app.redirectUris);

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
    localStorage.setItem('userId', currentUser?.id as string);
    // @ts-ignore
    o.currentUser = currentUser;
  }

  return o;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    menu: {
      request: async () => {
        const menuDataItems: MenuDataItem[] = [];

        const applicationId = localStorage.getItem('applicationId') || '';
        const userId = localStorage.getItem('userId') || '';

        if (window.location.origin + location.pathname !== localStorage.getItem('redirectUris')) {
          if (!applicationId || !userId) {
            goSsoLogin();
            return;
          }
          const menus = await getMenus(applicationId, userId);
          if (!menus) return [];

          setInitialState((s) => ({ ...s, menus }));
          toMenuDataItems(menus, menuDataItems, iconMaps);
          sortMenuDataItems(menuDataItems);
        }

        return menuDataItems;
      },
    },
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

      if (window.location.origin + location.pathname !== localStorage.getItem('redirectUris')) {
        if (
          !initialState?.menus &&
          initialState?.menus?.every((menu) => location.pathname !== menu.path)
        ) {
          history.push('/404');
        }
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
