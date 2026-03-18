import { Category } from '../../domain/entity';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export class CategoryMapper {
  static toPersistence(entity: Category) {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      description: entity.description,
      status: entity.status,
      liveCount: entity.liveCount || undefined,
      scheduledLiveCount: entity.scheduledLiveCount || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updateAt,
    };
  }
  static toDomain(doc: {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: CATEGORY_STATUS;
    liveCount?: number;
    scheduledLiveCount?: number;
    createdAt: Date;
    updatedAt: Date;
  }): Category {
    return Category.restore({
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      description: doc.description,
      status: doc.status,
      createdAt: doc.createdAt,
      liveCount: doc.liveCount,
      scheduledLiveCount: doc.scheduledLiveCount,
      updatedAt: doc.updatedAt,
    });
  }
}
