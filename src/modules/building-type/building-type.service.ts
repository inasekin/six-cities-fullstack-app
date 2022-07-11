import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {DocumentType} from '@typegoose/typegoose';
import {ModelType} from '@typegoose/typegoose/lib/types.js';

import {BuildingTypeServiceInterface} from './building-type-service.interface.js';
import CreateBuildingTypeDto from './dto/create-building-type.dto.js';
import {BuildingTypeEntity} from './building-type.entity.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';

@injectable()
class BuildingTypeService implements BuildingTypeServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.BuildingTypeModel) private readonly buildingTypeModel: ModelType<BuildingTypeEntity>
  ) {}

  public async find(): Promise<DocumentType<BuildingTypeEntity>[]> {
    return this.buildingTypeModel.find();
  }

  public async create(dto: CreateBuildingTypeDto): Promise<DocumentType<BuildingTypeEntity>> {
    const buildingType = new BuildingTypeEntity(dto);

    const result = await this.buildingTypeModel.create(buildingType);
    this.logger.info(`Добавлен новый тип ${buildingType.name}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<BuildingTypeEntity> | null> {
    return this.buildingTypeModel.findById(id);
  }

  public async findByName(name: string): Promise<DocumentType<BuildingTypeEntity> | null> {
    return this.buildingTypeModel.findOne({name});
  }

  public async findOrCreate(dto: CreateBuildingTypeDto): Promise<DocumentType<BuildingTypeEntity>> {
    return await this.findByName(dto.name) ?? await this.create(dto);
  }
}

export default BuildingTypeService;
