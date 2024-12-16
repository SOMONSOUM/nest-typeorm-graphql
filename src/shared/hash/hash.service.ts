import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    try {
      return await argon2.hash(password);
    } catch (error) {
      throw new GraphQLError('Error hashing password', {
        extensions: {
          code: 'ERROR_HASHING_PASSWORD',
        },
      });
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch (error) {
      throw new GraphQLError('Error verifying password', {
        extensions: {
          code: 'ERROR_VERIFYING_PASSWORD',
        },
      });
    }
  }
}
