import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DbUserEntity } from './db.user.entity';

@Injectable()
export class DbUserRepository extends Repository<DbUserEntity> {
  public async getById(id: DbUserEntity['id']): Promise<DbUserEntity | null> {
    return this.findOneBy({ id });
  }
  public async createUser(user: DbUserEntity): Promise<DbUserEntity> {
    return this.insert(user).then(() => user);
  }
}
