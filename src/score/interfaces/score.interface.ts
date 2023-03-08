import { Document } from 'mongoose';

export interface Score extends Document {
  readonly auth0_id: string;
  readonly points: number;
}
