import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
      include: { game: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: dto.game_id },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID "${dto.game_id}" not found`);
    }

    await this.prisma.run_categories.create({
      data: {
        run_category_id: uuidv4(),
        game_id: dto.game_id,
        run_category_name: dto.run_category_name,
      },
    });

    return { message: 'Run category created' };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    await this.prisma.run_categories.update({
      where: { run_category_id: id },
      data: dto,
    });

    return { message: 'Run category updated' };
  }

  async remove(id: string) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id: id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    await this.prisma.run_categories.delete({
      where: { run_category_id: id },
    });

    return { message: 'Run category deleted' };
  }
}