import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDTO } from './dto/create-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Post()
  async addScore(@Res() res, @Body() createScoreDTO: CreateScoreDTO) {
    const newScore = await this.scoreService.addScore(createScoreDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Score has been submitted successfully!',
      score: newScore,
    });
  }

  @Get(':auth0_id')
  async getScore(@Res() res, @Param('auth0_id') auth0_id) {
    const score = await this.scoreService.getScoreByAuth0Id(auth0_id);
    if (!score) throw new NotFoundException('Score does not exist!');
    return res.status(HttpStatus.OK).json(score);
  }

  @Get()
  async getScores(@Res() res) {
    console.log('etramos en el getScores');
    console.log('getScores');
    const scores = await this.scoreService.getScores();
    return res.status(HttpStatus.OK).json(scores);
  }

  @Put('/edit')
  async editScore(@Res() res, @Body() createScoreDTO: CreateScoreDTO) {
    const editedScore = await this.scoreService.editScore(createScoreDTO);
    if (!editedScore) throw new NotFoundException('Score does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Score has been successfully updated',
      score: editedScore,
    });
  }
}
