import { UserDto } from '../../../dto/user.dto';

export abstract class DataUserContract {
  public abstract getById(id: UserDto['id']): Promise<UserDto | null>;
  public abstract create(user: UserDto): Promise<UserDto>;
}
