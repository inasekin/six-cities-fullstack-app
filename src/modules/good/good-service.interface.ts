import {DocumentType} from '@typegoose/typegoose';
import {GoodEntity} from './good.entity.js';
import CreateGoodDto from './dto/create-good.dto.js';

interface GoodServiceInterface {
  find(): Promise<DocumentType<GoodEntity>[]>;
  create(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>>;
  findById(id: string): Promise<DocumentType<GoodEntity> | null>;
  findByName(name: string): Promise<DocumentType<GoodEntity> | null>;
  findOrCreate(dto: CreateGoodDto): Promise<DocumentType<GoodEntity>>;
}

export {GoodServiceInterface};
