import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass}  from '@typegoose/typegoose';

import CreateBuildingTypeDto from './dto/create-building-type.dto.js';

const {modelOptions, prop} = typegoose;

export interface BuildingTypeEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'building_types'
  }
})
export class BuildingTypeEntity extends TimeStamps {
  constructor({name}: CreateBuildingTypeDto) {
    super();

    this.name = name;
  }

  @prop({required: true})
  public name!: string;
}

export const BuildingTypeModel = getModelForClass(BuildingTypeEntity);
