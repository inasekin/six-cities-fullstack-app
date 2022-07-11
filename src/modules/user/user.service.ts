import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';

import {UserServiceInterface} from './user-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private readonly userModel: ModelType<UserEntity>
  ) {}

  public async find(): Promise<DocumentType<UserEntity>[]> {
    return this.userModel.find();
  }

  public async create(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);

    await user.setPassword(dto.password, saltRounds);
    const result = await this.userModel.create(user);
    this.logger.info(`Новый пользователь ${dto.email} был создан.`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>> {
    return await this.findByEmail(dto.email) ?? await this.create(dto, saltRounds);
  }

  public async updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findByIdAndUpdate(id, dto).exec();
  }

  public async verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (!user ||
      !await user.verifyPassword(dto.password)) {
      return null;
    }

    return user;
  }
}

export default UserService;
