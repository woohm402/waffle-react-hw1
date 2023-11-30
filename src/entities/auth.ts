import { type Brand } from '../utils/brand';
import { brand } from './../utils/brand';

export type AccessToken = Brand<string, 'AccessToken'>;

export const createAccessToken = (token: string): AccessToken => brand(token, 'AccessToken');
