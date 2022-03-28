import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorWeak: false,
  title: 'SV SSO',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  'layout': 'top',
  'fixedHeader': true,
  'headerHeight': 48,
  'splitMenus': false,
};

export default Settings;
