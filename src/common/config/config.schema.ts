import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  HOST: string;
  PORT: number;
  SALT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  UPLOAD_DIR: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  TOKEN_EXPIRATION_TIME: string;
}

export const configSchema = convict<ConfigSchema>({
  HOST: {
    doc: 'Адрес подключения к серверу',
    format: String,
    env: 'HOST',
    default: 'http://localhost'
  },
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 3000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: Number,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Username to connect to the database (MongoDB)',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Database connection password (MongoDB)',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: null
  },
  UPLOAD_DIR: {
    doc: 'Папка для загрузки файлов',
    format: String,
    env: 'UPLOAD_DIR',
    default: './upload',
  },
  JWT_SECRET: {
    doc: 'Секретная строка для генерации токена',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
  JWT_REFRESH_SECRET: {
    doc: 'Секретная строка для генерации токена',
    format: String,
    env: 'JWT_REFRESH_SECRET',
    default: null,
  },
  TOKEN_EXPIRATION_TIME: {
    doc: 'Время действия токена',
    format: String,
    env: 'TOKEN_EXPIRATION_TIME',
    default: '15m',
  }
});
