import { Column, Entity } from 'typeorm';
import { ProjectDto } from '../../../../../dto/project.dto';
import { DbBaseEntity } from '../db.base-entity';

@Entity({ name: 'meal' })
export class DbMealEntity extends DbBaseEntity {
  public constructor(partial: Partial<DbMealEntity>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'external_id', type: 'uuid' })
  public externalId: string;

  @Column({ name: 'project_id', type: 'varchar' })
  projectId: ProjectDto['id'];
}
