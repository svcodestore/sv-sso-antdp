import { stringify } from 'querystring';
import { history } from 'umi';

export function gotoWithRedirect(url: string) {
  const { search, pathname } = history.location;
  history.push({
    pathname: url,
    search:
      url !== pathname
        ? stringify({
            redirect: pathname + search,
          })
        : search,
  });
}
