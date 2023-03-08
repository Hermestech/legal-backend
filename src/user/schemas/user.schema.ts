import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  auth0_id: String,
  handle: String,
  email: String,
});
