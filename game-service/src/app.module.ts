import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { CategoriesModule } from './categories/categories.module';
import { JwtStrategy } from './common/guards/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    GamesModule,
    CategoriesModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}