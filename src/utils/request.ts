import qs from 'qs';
import { request as r } from 'umi';
import { ResponseError } from 'umi-request';
import { gotoWithRedirect } from './navigate';

const prefix = '/api';

const errorHandler = (e: ResponseError) => {
  if (e.response.status === 401) {
    localStorage.removeItem('accessToken');
    gotoWithRedirect('/login');
  }
};

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('accessToken') || '';
  let h: HeadersInit = {};
  if (token) {
    h = { Authorization: 'Bearer ' + token };
  }
  return h;
};

const getContentTypeHeader = () => {
  return { 'Content-Type': 'application/x-www-form-urlencoded' };
};

class Req {
  get<T>(url: string) {
    return r<T>(url, {
      method: 'GET',
      prefix,
      headers: { ...getAuthorizationHeader() },
      skipErrorHandler: true,
      errorHandler,
    });
  }

  delete<T>(url: string) {
    return r<T>(url, {
      prefix,
      method: 'DELETE',
      headers: { ...getAuthorizationHeader() },
      skipErrorHandler: true,
      errorHandler,
    });
  }

  post<T>(url: string, options?: any) {
    const o = {
      ...options,
      prefix,
      method: 'POST',
      headers: { ...getContentTypeHeader(), ...getAuthorizationHeader() },
      skipErrorHandler: true,
      errorHandler,
    };

    if (o.data) {
      o.data = qs.stringify(o.data);
    }
    return r<T>(url, o) as unknown as T;
  }

  put<T>(url: string, options?: any) {
    const o = {
      ...options,
      prefix,
      method: 'PUT',
      headers: { ...getContentTypeHeader(), ...getAuthorizationHeader() },
      skipErrorHandler: true,
      errorHandler,
    };
    if (o.data) {
      o.data = qs.stringify(o.data);
    }
    return r<T>(url, o);
  }

  patch<T>(url: string, options?: any) {
    if (options.data) {
      options.data = qs.stringify(options.data);
    }
    return r<T>(url, {
      ...options,
      prefix,
      method: 'PATCH',
      headers: { ...getContentTypeHeader(), ...getAuthorizationHeader() },
      skipErrorHandler: true,
      errorHandler,
    });
  }
}

export const request = new Req();
