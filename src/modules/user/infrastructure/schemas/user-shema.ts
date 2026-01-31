import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  dateOfBirth: { type: Date, default: true },

  gender: {
    type: String,
    default: true,
    enum: ['MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY'],
  },

  bio: { type: String, default: false },

  location: { type: String, default: false },

  socialLinks: { type: [String], default: false },

  contentType: {
    type: String,
    default: false,
    enum: ['SAFE_MODE', 'UNRESTRICTED'],
  },
});
