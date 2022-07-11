import {ClassConstructor, plainToInstance} from 'class-transformer';
import * as jose from 'jose';
import * as crypto from 'crypto';
import {createSecretKey} from 'crypto';
import {DatabaseOptions} from './db.js';
import ValidateTypeEnum from '../types/validate-type.enum.js';
import Payload from '../types/payload.js';

export const getOptionsString = (options: DatabaseOptions): string => {
  const optionsKeys = Object.keys(options);

  return optionsKeys.reduce((prev, current) =>
    `${prev === '' ? '?' : ''}${current}=${options[current as keyof DatabaseOptions]}`, '');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const getValidateMessage = (validateType: ValidateTypeEnum, value: string | number = ''): string => {
  switch(validateType) {
    case ValidateTypeEnum.MinLength:
      return `должно содержать значение длиной не меньше ${value} символов.`;
    case ValidateTypeEnum.Maxlength:
      return `должно содержать значение длиной больше ${value} символов.`;
    case ValidateTypeEnum.IsDateString:
      return 'должно быть в формате даты ISO.';
    case ValidateTypeEnum.IsEnum:
      return `должно содержать значение из перечисления ${value}`;
    case ValidateTypeEnum.IsMongoId:
      return 'некорректный формат идентификатора.';
    case ValidateTypeEnum.ArrayMinSize:
      return `должен содержать минимум ${value} значений.`;
    case ValidateTypeEnum.ArrayMaxSize:
      return `должен содержать максимум ${value} значений.`;
    case ValidateTypeEnum.IsBoolean:
      return 'должно быть типом булево.';
    case ValidateTypeEnum.Min:
      return `должно содержать число больше ${value}.`;
    case ValidateTypeEnum.Max:
      return `должно содержать число не больше ${value}.`;
    case ValidateTypeEnum.ValidateNested:
      return 'неверный формат значения';
    case ValidateTypeEnum.IsEmail:
      return 'неверный формат электронного адреса';
    case ValidateTypeEnum.IsJWT:
      return 'неверный формат токена';
    default:
      return `${validateType} - неизвестная ошибка.`;
  }
};

export const createJWT = async (
  algorithm: string,
  jwtSecret: string,
  payload: object,
  expirationTime = '30d'): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const verifyToken = async (token: string, secret: string): Promise<Payload> => {
  const {payload} = await jose.jwtVerify(token, createSecretKey(secret, 'utf-8'));

  return {id: payload.id as string, email: payload.email as string};
};
