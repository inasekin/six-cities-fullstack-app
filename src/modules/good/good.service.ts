import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {GoodServiceInterface} from './good-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {GoodEntity} from './good.entity.js';
import CreateGoodDto from './dto/create-good.dto.js';

@injectable()
export default class GoodService implements GoodServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.GoodModel) private readonly goodModel: ModelType<GoodEntity>
  ) {}

  public async find(): Promise<DocumentType<GoodEntity>[]> {
    return this.goodModel.find();
  }

  public async create(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>> {
    const good = new GoodEntity(dto);

    const result = await this.goodModel.create(good);
    this.logger.info(`Добавлено новое удобство ${good.name}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<GoodEntity> | null> {
    return this.goodModel.findById(id);
  }

  public async findByName(name: string): Promise<DocumentType<GoodEntity> | null> {
    return this.goodModel.findOne({name});
  }

  public async findOrCreate(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>> {
    return await this.findByName(dto.name) ?? await this.create(dto);
  }
}
