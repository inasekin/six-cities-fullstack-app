import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass}  from '@typegoose/typegoose';

import { City } from '../../types/city.type.js';
import CreateCityDto from './dto/create-city.dto.js';
import {Location} from '../../types/location.type.js';

const {modelOptions, prop} = typegoose;

export interface CityEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})
export class CityEntity extends TimeStamps implements City {
  constructor({name, latitude, longitude}: CreateCityDto) {
    super();

    this.name = name;
    this.location = {
      latitude,
      longitude,
      zoom: 10,
    };
  }

  @prop({required: true})
  public name!: string;

  @prop({required: true})
  public location!: Location;
}

export const CityModel = getModelForClass(CityEntity);
