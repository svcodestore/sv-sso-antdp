import qs from 'qs';
import { request as r } from 'umi';

class Req {
  get<T>(url: string) {
    return r<T>('/api' + url, { method: 'GET' });
  }

  delete<T>(url: string) {
    return r<T>('/api' + url, { method: 'DELETE' });
  }

  post<T>(url: string, options?: any) {
    const o = {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    if (o.data) {
      o.data = qs.stringify(o.data);
    }
    return r<T>('/api' + url, o) as unknown as T;
  }

  put<T>(url: string, options?: any) {
    const o = {
      ...options,
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    if (o.data) {
      o.data = qs.stringify(o.data);
    }
    return r<T>('/api' + url, o);
  }

  patch<T>(url: string, options?: any) {
    if (options.data) {
      options.data = qs.stringify(options.data);
    }
    return r<T>('/api' + url, {
      ...options,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}

export const request = new Req();
