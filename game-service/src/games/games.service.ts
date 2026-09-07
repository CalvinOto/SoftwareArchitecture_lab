import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.games.findMany();
  }

  async findOne(id: string) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
      include: { run_categories: true },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }
    return game;
  }

  async create(dto: CreateGameDto) {
    await this.prisma.games.create({
      data: {
        game_id: uuidv4(),
        game_name: dto.game_name,
        description: dto.description,
      },
    });
    return { message: 'Game created' };
  }

  async update(id: string, dto: UpdateGameDto) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
    });
    
    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    await this.prisma.games.update({
      where: { game_id: id },
      data: dto,
    });

    return { message: 'Game updated' };
  }

  async remove(id: string) {
    const game = await this.prisma.games.findUnique({
      where: { game_id: id },
    });

    if (!game) {
      throw new NotFoundException(`Game with ID "${id}" not found`);
    }

    await this.prisma.games.delete({
      where: { game_id: id },
    });

    return { message: 'Game deleted' };
  }
}