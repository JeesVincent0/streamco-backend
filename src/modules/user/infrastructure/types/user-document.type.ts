import { AdvertiserDocument, BaseUserDocument } from '../schemas';
import { UserDocument } from '../schemas';

export type UserMongoDocument = BaseUserDocument & UserDocument;
export type AdvertiserMongoDocument = BaseUserDocument & AdvertiserDocument;
