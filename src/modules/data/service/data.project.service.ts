import { Injectable } from '@nestjs/common';
import { DataProjectContract } from '../contract/data.project.contract';
import { ProjectDto } from '../../../dto/project.dto';
import { CacheService } from '../source/cache/cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DbProjectEntity } from '../source/db/project/db.project.entity';
import { DbProjectRepository } from '../source/db/project/db.project.repository';
import { DbProjectMapper } from '../source/db/project/db.project-mapper.service';

@Injectable()
export class DataProjectService implements DataProjectContract {
  public constructor(
    private readonly cacheService: CacheService,
    @InjectRepository(DbProjectEntity)
    private readonly projectRepo: DbProjectRepository,
    private readonly projectMapper: DbProjectMapper,
  ) {}
  public async create(project: ProjectDto): Promise<ProjectDto> {
    return this.projectRepo
      .createProject(this.projectMapper.mapToDb(project))
      .then((project) => this.cacheService.saveProject(project));
  }

  public async getById(id: ProjectDto['id']): Promise<ProjectDto | null> {
    const cached = await this.cacheService.getProjectById(id);
    if (cached !== null) {
      return cached;
    }
    const db = await this.projectRepo.findById(id);
    if (db !== null) {
      await this.cacheService.saveProject(db);
    }
    return db;
  }

  public async getByName(name: ProjectDto['name']): Promise<ProjectDto | null> {
    const cached = await this.cacheService.getProjectByName(name);
    if (cached !== null) {
      return cached;
    }
    const db = await this.projectRepo.findByName(name);
    if (db !== null) {
      await this.cacheService.saveProject(db);
    }
    return db;
  }
}
