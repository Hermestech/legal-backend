import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreSchema } from './schemas/score.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Score', schema: ScoreSchema }]),
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
})
export class ScoreModule {}
