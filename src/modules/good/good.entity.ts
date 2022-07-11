import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass}  from '@typegoose/typegoose';

import CreateGoodDto from './dto/create-good.dto.js';

const {modelOptions, prop} = typegoose;

export interface GoodEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'goods'
  }
})
export class GoodEntity extends TimeStamps {
  constructor({name}: CreateGoodDto) {
    super();

    this.name = name;
  }

  @prop({required: true})
  public name!: string;
}

export const GoodModel = getModelForClass(GoodEntity);
