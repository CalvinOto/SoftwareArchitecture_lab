import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRunDto } from './dto/create-run.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RunsService {
  constructor(private readonly prisma: PrismaService) {}

  private formatDuration(sec: number): string {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours} Hour(s) ${minutes} Minute(s) ${seconds} Second(s)`;
  }

  private async getUser(userId: string) {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/profile`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  private async getCategory(categoryId: string) {
    try {
      const res = await fetch(`http://localhost:3001/categories/${categoryId}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  async findByCategory(categoryId: string) {
    const category = await this.getCategory(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const runs = await this.prisma.runs.findMany({
      where: {
        run_category_id: categoryId,
        status: 'ACCEPTED',
      },
      orderBy: { run_duration: 'asc' },
    });

    return Promise.all(
      runs.map(async (run) => {
        const runner = await this.getUser(run.user_id);
        return {
          run_id: run.run_id,
          runner: runner ? { username: runner.username, country: runner.country } : null,
          game: category.game,
          run_duration: this.formatDuration(Number(run.run_duration)),
          vod_url: run.vod_url,
        };
      }),
    );
  }

  async findByUser(userId: string, requesterId: string) {
    const whereClause: any = { user_id: userId };
    if (userId !== requesterId) {
      whereClause.status = 'ACCEPTED';
    }

    const runs = await this.prisma.runs.findMany({ where: whereClause });
    return runs.map(run => ({
      ...run,
      run_duration: Number(run.run_duration),
    }));
  }

  async findOne(id: string) {
    const run = await this.prisma.runs.findUnique({
      where: { run_id: id },
      include: { comments: true },
    });

    if (!run) {
      throw new NotFoundException('Run not found');
    }

    const runner = await this.getUser(run.user_id);
    const category = await this.getCategory(run.run_category_id);

    return {
      ...run,
      run_duration: Number(run.run_duration),
      runner,
      category,
      game: category?.game ?? null,
    };
  }

  async create(dto: CreateRunDto, userId: string) {
    const category = await this.getCategory(dto.run_category_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.prisma.runs.create({
      data: {
        run_id: uuidv4(),
        run_category_id: dto.run_category_id,
        user_id: userId,
        vod_url: dto.vod_url,
        run_duration: dto.run_duration,
        submitted_at: new Date(),
        status: 'PENDING',
      },
    });

    return { message: 'Run submitted' };
  }

  async findByStatus(status: string) {
    const runs = await this.prisma.runs.findMany({ where: { status } });
    return runs.map(run => ({
      ...run,
      run_duration: Number(run.run_duration),
    }));
  }

  async accept(id: string) {
    const run = await this.prisma.runs.findUnique({ where: { run_id: id } });
    if (!run) throw new NotFoundException('Run not found');

    await this.prisma.runs.update({
      where: { run_id: id },
      data: { status: 'ACCEPTED', verified_at: new Date() },
    });

    return { message: 'Run accepted' };
  }

  async reject(id: string) {
    const run = await this.prisma.runs.findUnique({ where: { run_id: id } });
    if (!run) throw new NotFoundException('Run not found');

    await this.prisma.runs.update({
      where: { run_id: id },
      data: { status: 'REJECTED', verified_at: new Date() },
    });

    return { message: 'Run rejected' };
  }
}