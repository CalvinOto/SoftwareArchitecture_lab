import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto, requesterId: string) {
    if (dto.user_id !== requesterId) {
      throw new ForbiddenException('Unauthorized');
    }

    const run = await this.prisma.runs.findUnique({ where: { run_id: dto.run_id } });
    if (!run) throw new NotFoundException(`Run with ID "${dto.run_id}" not found`);
    
    const res = await fetch(`http://localhost:3000/users/${dto.user_id}/profile`);
    if (!res.ok) throw new NotFoundException(`User with ID "${dto.user_id}" not found`);

    await this.prisma.comments.create({
      data: {
        comment_id: uuidv4(),
        run_id: dto.run_id,
        user_id: dto.user_id,
        comment: dto.comment,
        created_at: new Date(),
      },
    });

    return { message: 'Comment created' };
  }

  async remove(commentId: string, requesterId: string) {
    const comment = await this.prisma.comments.findUnique({
      where: { comment_id: commentId },
    });

    if (!comment) throw new NotFoundException(`Comment with ID "${commentId}" not found`);

    if (comment.user_id !== requesterId) {
      throw new ForbiddenException('Unauthorized');
    }

    await this.prisma.comments.delete({ where: { comment_id: commentId } });

    return { message: 'Comment deleted' };
  }
}