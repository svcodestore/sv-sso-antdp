// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResultType<T> = {
    code: number;
    data: T;
    message: string;
  };

  type ModificationFields = {
    createdAt: string;
    updatedAt: string;
  };

  type User = {
    id: string;
    uuid: string;
    loginId: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    lang: string;
    status: boolean;
    alias: string;
    createdByUser?: User;
    updatedByUser?: User;
  } & ModificationFields;

  type Organization = {
    id: string;
    code: string;
    name: string;
    status: boolean;
  } & ModificationFields;

  type OrganizationApplication = {
    organizationsList: Organization;
    applicationsList: Application;
    status: boolean;
  } & ModificationFields;

  type Application = {
    id: string;
    code: string;
    name: string;
    internalUrl: string;
    homepageUrl: string;
    status: boolean;
    clientId: string;
    clientSecret: string;
    redirectUris: string;
    loginUris: string;
    tokenFormat: string;
  } & ModificationFields;

  type ApplicationUser = {
    applicationsList: Application;
    usersList: User;
    status: boolean;
  } & ModificationFields;

  type CurrentUser = {
    name?: string;
    avatar?: string;
    id?: string;
    uuid?: string;
    loginId?: string;
    email?: string;
    phone?: string;
    status?: boolean;
  };

  type LoginResult = {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
    errNameOrPassword?: boolean;
  };

  type RequestGrantCodeParams = {
    responseType: string;
    clientId: string;
    redirectUri: string;
    scope?: string;
    state?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    clientId: string;
    username?: string;
    password?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
