import { stringify } from 'querystring';
import { history } from 'umi';

export function gotoWithRedirect(url: string) {
  const { search, pathname } = history.location;
  history.push({
    pathname: url,
    search: [url, url + '/'].includes(pathname)
      ? search
      : stringify({
          redirect: pathname + search,
        }),
  });
}

export function goSsoLogin() {
  const authPath = localStorage.getItem('loginUris') || '';
  const clientId = localStorage.getItem('clientId') || '';
  const callbackPath = localStorage.getItem('redirectUris') || '';
  if (!authPath || !clientId || !callbackPath) {
    window.location.reload();
    return;
  }
  const authSearchParams = new URLSearchParams();
  authSearchParams.append('response_type', 'code');
  authSearchParams.append('client_id', clientId);
  authSearchParams.append('redirect_uri', callbackPath);
  authSearchParams.append('scope', 'read');
  const authHref = authPath + authSearchParams.toString();

  window.location.href = authHref;
}
