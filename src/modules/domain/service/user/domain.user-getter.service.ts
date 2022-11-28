import { Injectable } from '@nestjs/common';
import { DataUserContract } from '../../../data/contract/data.user.contract';
import { UserDto } from '../../../../dto/user.dto';
import { ProjectDto } from '../../../../dto/project.dto';

@Injectable()
export class DomainUserGetter {
  public constructor(private readonly dataUserService: DataUserContract) {}
  public async getUserById(
    id: UserDto['id'],
    project: ProjectDto,
  ): Promise<UserDto | null> {
    return this.dataUserService.getById(id, project);
  }
}
