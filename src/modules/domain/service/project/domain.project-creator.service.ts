import { Injectable } from '@nestjs/common';
import { DataProjectContract } from '../../../data/contract/data.project.contract';
import { ProjectDto } from '../../../../dto/project.dto';

@Injectable()
export class DomainProjectCreator {
  public constructor(
    private readonly dataProjectService: DataProjectContract,
  ) {}
  public async createProject(project: ProjectDto): Promise<ProjectDto> {
    return this.dataProjectService.create(project);
  }
}
