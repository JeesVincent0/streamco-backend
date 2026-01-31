import { Schema } from 'mongoose';

export const AdvertiserSchema = new Schema({
  comapanyName: { type: String, required: true },
});
