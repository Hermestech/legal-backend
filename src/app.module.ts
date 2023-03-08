import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-blog', {
      useNewUrlParser: true,
    }),
    BlogModule,
    UserModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
