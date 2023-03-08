import * as mongoose from 'mongoose';

export const ScoreSchema = new mongoose.Schema({
  auth0_id: String,
  points: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
