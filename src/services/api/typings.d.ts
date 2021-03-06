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
    /** ????????????????????? */
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
    /** ???????????????????????? */
    errorCode: string;
    /** ???????????????????????? */
    errorMessage?: string;
    /** ?????????????????????????????? */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** ????????????????????? */
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

  type Menu = {
    pid: string;
    applicationId: string;
    code: string;
    name: string;
    sortNo: number;
    path: string;
    redirect: string;
    component: string;
    icon: string;
    hide: boolean;
  } & BaseFields;

  type BaseFields = {
    id: string;
    status: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
  };
}
