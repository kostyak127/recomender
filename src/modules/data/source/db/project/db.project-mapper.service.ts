import { Injectable } from '@nestjs/common';
import { ProjectDto } from '../../../../../dto/project.dto';
import { DbProjectEntity } from './db.project.entity';

@Injectable()
export class DbProjectMapper {
  public mapToDb(dto: ProjectDto): DbProjectEntity {
    return new DbProjectEntity({
      id: dto.id,
      name: dto.name,
    });
  }
  public mapToDto(db: DbProjectEntity): ProjectDto {
    return {
      id: db.id,
      name: db.name,
    };
  }
}
