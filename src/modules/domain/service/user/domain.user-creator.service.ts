import { Injectable } from '@nestjs/common';
import { DataUserContract } from '../../../data/contract/data.user.contract';
import { UserDto } from '../../../../dto/user.dto';

@Injectable()
export class DomainUserCreator {
  public constructor(private readonly dataUserService: DataUserContract) {}
  public async createUser(user: UserDto): Promise<UserDto> {
    return this.dataUserService.create(user);
  }
}
