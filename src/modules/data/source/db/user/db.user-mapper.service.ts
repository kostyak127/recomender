import { Injectable } from '@nestjs/common';
import { UserDto } from '../../../../../dto/user.dto';
import { DbUserEntity } from './db.user.entity';
import { Helper } from '../../../../utils/utils.helper';
import { ProjectDto } from '../../../../../dto/project.dto';

@Injectable()
export class DbUserMapper {
  public mapToDb(dto: UserDto): DbUserEntity {
    return new DbUserEntity({
      id: Helper.getHex(dto.id + dto.project.id),
      externalId: dto.id,
      projectId: dto.project.id,
    });
  }
  public mapToDto(db: DbUserEntity, project: ProjectDto): UserDto {
    return {
      id: db.externalId,
      project,
    };
  }
}
