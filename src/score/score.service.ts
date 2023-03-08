import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Score } from './interfaces/score.interface';
import { CreateScoreDTO } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel('Score') private readonly scoreModel: Model<Score>,
  ) {}

  async addScore(createScoreDTO: CreateScoreDTO): Promise<Score> {
    const existingScore = await this.scoreModel
      .findOne({ auth0_id: createScoreDTO.auth0_id })
      .exec();
    if (existingScore) {
      console.log('Score already exists');
      throw new BadRequestException('Score already exists');
    }
    const newScore = await new this.scoreModel(createScoreDTO);
    return newScore.save();
  }

  async getScoreByAuth0Id(auth0_id): Promise<Score> {
    const score = await this.scoreModel.findOne({ auth0_id: auth0_id }).exec();
    return score;
  }

  async getScores(): Promise<Score[]> {
    try {
      const scores = await this.scoreModel.find({}).exec();
      return scores;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async editScore({ auth0_id, points }: CreateScoreDTO): Promise<Score> {
    const editedScore = await this.scoreModel.findOneAndUpdate(
      {
        auth0_id: auth0_id,
      },
      {
        points: points,
      },
      { new: true },
    );
    console.log('editedScore', editedScore);
    return editedScore;
  }
}
