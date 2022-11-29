import { Injectable } from '@nestjs/common';
import { DataProjectContract } from '../../../data/contract/data.project.contract';
import { ProjectDto } from '../../../../dto/project.dto';

@Injectable()
export class DomainProjectGetter {
  public constructor(
    private readonly dataProjectService: DataProjectContract,
  ) {}
  public async getByName(name: ProjectDto['name']): Promise<ProjectDto | null> {
    return this.dataProjectService.getByName(name);
  }
  public async getByToken(
    token: ProjectDto['token'],
  ): Promise<ProjectDto | null> {
    return this.dataProjectService.getByToken(token);
  }
}
