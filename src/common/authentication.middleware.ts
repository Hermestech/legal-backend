/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
          'https://dev-jay522awf0mbu4y3.us.auth0.com/.well-known/jwks.json',
      }),
      // audience: `http://localhost:8000/api/v2/`,
      algorithms: ['RS256'],
    })(req, res, (err) => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry, we could not process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
