import type { MenuDataItem } from '@ant-design/pro-layout';

export function toMenuDataItems(
  menus: API.Menu[],
  menuDataItems: MenuDataItem[],
  iconMaps: Record<string, any>,
  pid = '0',
) {
  menus.forEach((menu) => {
    const menuDataItem: MenuDataItem & { redirect?: string; sortNo: number } = {
      name: menu.code,
      key: menu.code,
      path: menu.path,
      sortNo: menu.sortNo,
    };
    if (menu.redirect) {
      menuDataItem.redirect = menu.redirect;
    }
    if (menu.component) {
      if (menu.component === 'false') {
        menuDataItem.layout = false;
      } else {
        menuDataItem.component = menu.component;
      }
    }
    if (menu.icon) {
      menuDataItem.icon = iconMaps[menu.icon];
    }
    if (menu.hide) {
      menuDataItem.hideInMenu = menu.hide;
    }
    if (pid === '0') {
      menuDataItems.push(menuDataItem);
    } else if (menu.pid === pid) {
      menuDataItem.routes = [];
      toMenuDataItems(menus, menuDataItem.routes, iconMaps, menu.id);
      if (menuDataItem.routes && menuDataItem.routes.length < 1) {
        delete menuDataItem.routes;
      }
      menuDataItems.push(menuDataItem);
    }
  });
}

export function sortMenuDataItems(menuDataItems: MenuDataItem[]) {
  menuDataItems.sort((a, b) => a.sortNo - b.sortNo);

  menuDataItems.forEach((item) => {
    if (item.routes && item.routes.length > 1) {
      sortMenuDataItems(item.routes);
    }
  });
}
