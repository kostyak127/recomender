import { Injectable } from '@nestjs/common';
import { DataUserContract } from '../../../data/contract/data.user.contract';
import { UserDto } from '../../../../dto/user.dto';

@Injectable()
export class DomainUserGetter {
  public constructor(private readonly dataUserService: DataUserContract) {}
  public async getUserById(id: UserDto['id']): Promise<UserDto | null> {
    return this.dataUserService.getById(id);
  }
}
