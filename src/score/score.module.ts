import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from './schemas/score.schema';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Score', schema: ScoreSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
