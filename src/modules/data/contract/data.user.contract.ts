import { UserDto } from '../../../dto/user.dto';
import { ProjectDto } from '../../../dto/project.dto';

export abstract class DataUserContract {
  public abstract getById(
    id: UserDto['id'],
    project: ProjectDto,
  ): Promise<UserDto | null>;
  public abstract create(user: UserDto): Promise<UserDto>;
}
