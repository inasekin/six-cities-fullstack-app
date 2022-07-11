import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {CityServiceInterface} from './city-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CityEntity} from './city.entity.js';
import CreateCityDto from './dto/create-city.dto.js';

@injectable()
class CityService implements CityServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CityModel) private readonly cityModel: ModelType<CityEntity>
  ) {}

  public async find(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel.find();
  }

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = new CityEntity(dto);

    const result = await this.cityModel.create(city);
    this.logger.info(`Новый город ${dto.name} был добавлен.`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(id);
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name});
  }

  public async findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    return await this.findByName(dto.name) ?? await this.create(dto);
  }
}

export default CityService;
