import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {OfferServiceInterface} from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

const POPULATE_FIELDS = ['city', 'type', 'goods', 'host'];
const MAX_OFFERS_COUNT = 50;
const ADD_COMMENT_COUNT = 1;

@injectable()
class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly modelOffer: ModelType<OfferEntity>
  ) {}

  public async find(userId = ''): Promise<DocumentType<OfferEntity>[]> {
    return this.modelOffer.aggregate([
      {
        $lookup: {
          from: 'favorites',
          let: {offerId: '$_id', userId: userId},
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: [ '$offerId', '$$offerId' ]},
                    { $eq: [ { $toString: '$userId' }, '$$userId' ]},
                  ]
                }
              }
            }
          ],
          as: 'favorites'
        }
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          isFavorite: { $gt: [{ $size: '$favorites' }, 0 ]}
        }
      },
      { $unset: 'favorites' },
      { $limit: MAX_OFFERS_COUNT },
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: '_id',
          as: 'city'
        }
      },
      { $unwind: '$city' },
      {
        $lookup: {
          from: 'building_types',
          localField: 'type',
          foreignField: '_id',
          as: 'type'
        }
      },
      { $unwind: '$type' },
      {
        $lookup: {
          from: 'goods',
          localField: 'goods',
          foreignField: '_id',
          as: 'goods'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'host',
          foreignField: '_id',
          as: 'host'
        }
      },
      { $unwind: '$host' }
    ]).exec();
  }

  public async create(dto: CreateOfferDto, userId: string): Promise<DocumentType<OfferEntity>> {
    const result = await this.modelOffer.create({...dto, host: userId});

    this.logger.info(`Добавлено новое предложение id: ${result.id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findById(id).populate(POPULATE_FIELDS).exec();
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.modelOffer.find({isPremium: true}).populate(POPULATE_FIELDS).exec();
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findByIdAndUpdate(id, dto, {new: true})
      .populate(POPULATE_FIELDS).exec();
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.modelOffer.findByIdAndDelete(id);
  }

  public async isOwner(userId: string, documentId: string): Promise<boolean> {
    return (await this.modelOffer.exists({_id: documentId, host: userId}) !== null);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.modelOffer.exists({_id: documentId}) !== null);
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findByIdAndUpdate(offerId, {'$inc': {commentCount: ADD_COMMENT_COUNT}}).exec();
  }

  public async decCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.modelOffer.findByIdAndUpdate(offerId, {'$inc': {commentCount: -ADD_COMMENT_COUNT}}).exec();
  }
}

export default OfferService;
