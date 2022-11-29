import { Column, Entity } from 'typeorm';
import { DbBaseEntity } from '../db.base-entity';

@Entity({ name: 'project' })
export class DbProjectEntity extends DbBaseEntity {
  public constructor(partial: Partial<DbProjectEntity>) {
    super();
    Object.assign(this, partial);
  }
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'token', type: 'varchar' })
  token: string;
}
