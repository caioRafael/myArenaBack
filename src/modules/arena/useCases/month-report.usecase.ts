import { Injectable } from '@nestjs/common';
import { IArenaRepository } from '../repositories/arena.repository';

@Injectable()
export class MonthReportUseCase {
  constructor(private arenaRepository: IArenaRepository) {}

  async execute(id: string) {
    const arenaReport = await this.arenaRepository.monthReport(id);

    return arenaReport;
  }
}
