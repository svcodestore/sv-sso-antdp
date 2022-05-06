import moment from 'moment';

export const DATETIME = 'YYYY-MM-DD HH:mm:ss';

export const toChinaDatetime = (str: string): string => {
  return moment(str).add(8, 'hour').format(DATETIME);
};
