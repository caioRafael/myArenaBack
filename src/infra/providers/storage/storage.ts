import { promises } from 'dns';
import { FileDto } from 'src/modules/user/dto/user.dto';

export abstract class IStorage {
  abstract upload(file: FileDto): Promise<string>;
  abstract delete(url: string): Promise<void>;
}
