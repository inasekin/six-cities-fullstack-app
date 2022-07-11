import createBuildingTypeDto from './dto/create-building-type.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {BuildingTypeEntity} from './building-type.entity.js';

interface BuildingTypeServiceInterface {
  find(): Promise<DocumentType<BuildingTypeEntity>[]>;
  create(dto: createBuildingTypeDto): Promise<DocumentType<BuildingTypeEntity>>;
  findById(id: string): Promise<DocumentType<BuildingTypeEntity> | null>;
  findByName(name: string): Promise<DocumentType<BuildingTypeEntity> | null>;
  findOrCreate(dto: createBuildingTypeDto): Promise<DocumentType<BuildingTypeEntity>>;
}

export {BuildingTypeServiceInterface};
