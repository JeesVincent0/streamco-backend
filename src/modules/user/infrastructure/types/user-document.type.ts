import { BaseUserDocument } from '../schemas';
import { UserDocument } from '../schemas';

export type UserMongoDocument = BaseUserDocument & UserDocument;
