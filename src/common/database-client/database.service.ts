import {inject, injectable} from 'inversify';
import mongoose from 'mongoose';
import 'reflect-metadata';

import {Component} from '../../types/component.types.js';
import {DatabaseInterface} from './database.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';

@injectable()
class DatabaseService implements DatabaseInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface) {}

  public async connect(uri: string): Promise<void> {
    this.logger.info('Попытка подключения к базе данных...');
    await mongoose.connect(uri);
    this.logger.info('Подключение к базе данных установлено.');
  }

  public async disconnect(): Promise<void> {
    this.logger.info('Выполняется отключение от базы данных...');
    await mongoose.disconnect();
    this.logger.info('Отключение от базы данных выполнено.');
  }
}

export default DatabaseService;
