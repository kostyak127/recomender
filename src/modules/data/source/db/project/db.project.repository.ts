import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DbProjectEntity } from './db.project.entity';

@Injectable()
export class DbProjectRepository extends Repository<DbProjectEntity> {
  public async findById(
    id: DbProjectEntity['id'],
  ): Promise<DbProjectEntity | null> {
    return this.findOneBy({ id });
  }
  public async findByName(
    name: DbProjectEntity['name'],
  ): Promise<DbProjectEntity | null> {
    return this.findOneBy({ name });
  }
  public async createProject(
    project: DbProjectEntity,
  ): Promise<DbProjectEntity> {
    return this.insert(project).then(() => project);
  }
}
