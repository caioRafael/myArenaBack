import FieldDto from '../dto/field.dto';

export abstract class IFieldRepository {
  abstract create(data: FieldDto): Promise<FieldDto | null>;
  abstract findAllByArena(arenaId: string): Promise<FieldDto[]>;
  abstract findOne(id: string): Promise<FieldDto | null>;
}
