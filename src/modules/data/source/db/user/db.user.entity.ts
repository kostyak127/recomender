import { Column, Entity } from 'typeorm';
import { DbBaseEntity } from '../db.base-entity';
import { DbProjectEntity } from '../project/db.project.entity';
import { DbMealEntity } from '../meal/db.meal.entity';

@Entity({ name: 'user' })
export class DbUserEntity extends DbBaseEntity {
  public constructor(partial: Partial<DbMealEntity>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ name: 'external_id', type: 'uuid' })
  externalId: string;

  @Column({ name: 'project_id', type: 'varchar' })
  projectId: DbProjectEntity['id'];
}
