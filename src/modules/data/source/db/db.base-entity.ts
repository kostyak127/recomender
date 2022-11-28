import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DbBaseEntity {
  @PrimaryColumn({ update: false, name: 'id', type: 'varchar' })
  public id: string;

  @CreateDateColumn({ update: false, name: 'created_at' })
  public readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public readonly updatedAt: Date;
}
