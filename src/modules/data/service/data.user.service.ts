import { Injectable } from '@nestjs/common';
import { DataUserContract } from '../contract/data.user.contract';
import { UserDto } from '../../../dto/user.dto';
import { DbUserMapper } from '../source/db/user/db.user-mapper.service';
import { DbUserRepository } from '../source/db/user/db.user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DbUserEntity } from '../source/db/user/db.user.entity';
import { ProjectDto } from '../../../dto/project.dto';
import { Helper } from '../../utils/utils.helper';
import { CacheService } from '../source/cache/cache.service';

@Injectable()
export class DataUserService implements DataUserContract {
  public constructor(
    private readonly userMapper: DbUserMapper,
    @InjectRepository(DbUserEntity)
    private readonly userRepo: DbUserRepository,
    private readonly cacheService: CacheService,
  ) {}
  public async create(user: UserDto): Promise<UserDto> {
    return this.userRepo
      .createUser(this.userMapper.mapToDb(user))
      .then((db) => this.cacheService.saveUser(user, db.id));
  }

  public async getById(
    id: UserDto['id'],
    project: ProjectDto,
  ): Promise<(UserDto & { dbId: DbUserEntity['id'] }) | null> {
    const cacheUser = await this.cacheService.getUser(id, project.id);
    if (cacheUser !== null) {
      return cacheUser;
    }
    return this.userRepo.getById(Helper.getHex(id + project.id)).then((u) => {
      return u ? { ...this.userMapper.mapToDto(u, project), dbId: u.id } : null;
    });
  }
}
