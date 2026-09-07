import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { RunsModule } from './runs/runs.module';
import { CommentsModule } from './comments/comments.module';
import { JwtStrategy } from './common/guards/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    RunsModule,
    CommentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}