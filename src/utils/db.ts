import {getOptionsString} from './utils.js';

export type DatabaseOptions = {
  authSource?: string;
};

export const getURI = (
  username: string,
  password: string,
  host: string,
  port: number,
  databaseName: string,
  options: DatabaseOptions = {}
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}${getOptionsString(options)}`;
