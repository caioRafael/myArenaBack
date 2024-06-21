import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';

@Injectable()
export class ReportUseCase {
  constructor(private prisma: PrismaService) {}

  async execute() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // +1 porque os meses em JavaScript vão de 0 a 11
    const anoAtual = dataAtual.getFullYear();

    const report = await this.prisma.scheduleTime.findMany({
      where: {
        AND: [
          {
            date: {
              gte: new Date(`${anoAtual}-${mesAtual}-01`),
              lt: new Date(`${anoAtual}-${mesAtual + 1}-01`),
            },
          },
        ],
      },
    });

    return report;
  }
}
