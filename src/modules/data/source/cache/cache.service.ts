import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MealDto } from '../../../../dto/meal.dto';
import { ProjectDto } from '../../../../dto/project.dto';
import { RatingDto } from '../../../../dto/rating.dto';
import { UserDto } from '../../../../dto/user.dto';
import { Config } from '../../../config/config.variable-getter.service';
import { Helper } from '../../../utils/utils.helper';
import { DbUserEntity } from '../db/user/db.user.entity';

@Injectable()
export class CacheService {
  private readonly mealCacheTime = Config.MEAL_TTL;
  private readonly ratingCacheTime = Config.RATING_TTL;
  private readonly projectCacheTime = Config.PROJECT_TTL;
  private readonly userCacheTime = Config.USER_TTL;
  public constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  public async saveMeal(meal: MealDto): Promise<MealDto> {
    return this.cacheManager.set(this.generateMealKey(meal), meal, {
      ttl: this.mealCacheTime,
    });
  }
  public async getMealByIdAndProjectId(
    mealId: MealDto['id'],
    projectId: ProjectDto['id'],
  ): Promise<MealDto | null> {
    return this.cacheManager
      .get<MealDto>(this.getMealKey(mealId, projectId))
      .then((m) => m || null);
  }
  public async saveProject(project: ProjectDto): Promise<ProjectDto> {
    return this.cacheManager
      .set(this.generateProjectByIdKey(project), project, {
        ttl: this.projectCacheTime,
      })
      .then(() =>
        this.cacheManager.set(this.generateProjectByNameKey(project), project, {
          ttl: this.projectCacheTime,
        }),
      );
  }
  public async getProjectByName(
    projectName: ProjectDto['name'],
  ): Promise<ProjectDto | null> {
    return this.cacheManager
      .get<ProjectDto>(this.getProjectNameKey(projectName))
      .then((p) => p || null);
  }
  public async getProjectById(
    projectId: ProjectDto['id'],
  ): Promise<ProjectDto | null> {
    return this.cacheManager
      .get<ProjectDto>(this.getProjectIdKey(projectId))
      .then((p) => p || null);
  }
  public async saveRating(rating: RatingDto): Promise<RatingDto> {
    return this.cacheManager.set(this.generateRatingKey(rating), rating, {
      ttl: this.ratingCacheTime,
    });
  }
  public async getRating(
    mealId: MealDto['id'],
    projectId: ProjectDto['id'],
    userId: UserDto['id'],
  ): Promise<RatingDto[]> {
    const forUser = await this.cacheManager
      .get<RatingDto>(this.getRatingCacheKey(mealId, projectId, userId))
      .then((r) => r || null);
    const general = await this.cacheManager
      .get<RatingDto>(this.getRatingCacheKey(mealId, projectId, null))
      .then((r) => r || null);
    return Helper.removeEmptyValues([forUser, general]);
  }
  public async saveUser(
    user: UserDto,
    dbId: DbUserEntity['id'],
  ): Promise<UserDto & { dbId: DbUserEntity['id'] }> {
    return this.cacheManager.set(
      this.generateUserKey(user),
      { ...user, dbId: dbId },
      {
        ttl: this.userCacheTime,
      },
    );
  }
  public async getUser(
    userId: UserDto['id'],
    projectId: ProjectDto['id'],
  ): Promise<(UserDto & { dbId: DbUserEntity['id'] }) | null> {
    return this.cacheManager
      .get<UserDto & { dbId: DbUserEntity['id'] }>(
        this.getUserKey(userId, projectId),
      )
      .then((u) => u || null);
  }
  protected getProjectNameKey(name: ProjectDto['name']): string {
    return `cache_project_name_${name}`;
  }
  protected getProjectIdKey(id: ProjectDto['id']): string {
    return `cache_project_id_${id}`;
  }
  protected getMealKey(
    mealId: MealDto['id'],
    projectId: ProjectDto['id'],
  ): string {
    return `cache_meal_${mealId}_${projectId}`;
  }
  protected generateMealKey(meal: MealDto): string {
    return `cache_meal_${meal.id}_${meal.project.id}`;
  }
  protected generateProjectByNameKey(project: ProjectDto): string {
    return `cache_project_name_${project.name}`;
  }
  protected generateProjectByIdKey(project: ProjectDto): string {
    return `cache_project_id_${project.id}`;
  }
  protected generateRatingKey(rating: RatingDto): string {
    return rating.user === null
      ? `cache_rating_meal_id_${rating.meal.id}_project_id_${rating.meal.project.id}`
      : `cache_rating_meal_id_${rating.meal.id}_user_id${rating.user.id}_project_id_${rating.meal.project.id}`;
  }
  protected getRatingCacheKey(
    mealId: MealDto['id'],
    projectId: ProjectDto['id'],
    userId: UserDto['id'] | null,
  ): string {
    return userId === null
      ? `cache_rating_meal_id_${mealId}_project_id_${projectId}`
      : `cache_rating_meal_id_${mealId}_user_id${userId}_project_id_${projectId}`;
  }
  protected generateUserKey(user: UserDto): string {
    return `cache_user_id_${user.id}_project_id_${user.project.id}`;
  }
  protected getUserKey(
    userId: UserDto['id'],
    projectId: ProjectDto['id'],
  ): string {
    return `cache_user_id_${userId}_project_id_${projectId}`;
  }
}
