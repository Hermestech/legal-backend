import { Document } from 'mongoose';

export interface User extends Document {
  readonly auth0_id: string;
  readonly handle: string;
  readonly email: string;
}
