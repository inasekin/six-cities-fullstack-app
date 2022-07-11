import {DocumentType} from '@typegoose/typegoose';

import CreateUserDto from './dto/create-user.dto.js';
import {UserEntity} from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';

interface UserServiceInterface {
  find(): Promise<DocumentType<UserEntity>[]>;
  create(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, saltRounds: number): Promise<DocumentType<UserEntity>>;
  updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  verifyUser(dto: LoginUserDto): Promise<DocumentType<UserEntity> | null>;
}

export {UserServiceInterface};
