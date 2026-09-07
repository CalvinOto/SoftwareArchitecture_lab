import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exist = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (exist) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPass = await bcrypt.hash(dto.password, 10);

    await this.prisma.users.create({
      data: {
        user_id: uuidv4(),
        username: dto.username,
        email: dto.email,
        password: hashedPass,
        country: dto.country,
        role: 'USER',
      },
    });

    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.user_id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}