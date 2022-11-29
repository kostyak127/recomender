import { ProjectDto } from '../../../dto/project.dto';

export abstract class DataProjectContract {
  public abstract getByName(
    name: ProjectDto['name'],
  ): Promise<ProjectDto | null>;
  public abstract getByToken(
    name: ProjectDto['token'],
  ): Promise<ProjectDto | null>;
  public abstract getById(name: ProjectDto['id']): Promise<ProjectDto | null>;
  public abstract create(project: ProjectDto): Promise<ProjectDto>;
}
