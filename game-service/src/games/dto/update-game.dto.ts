import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateGameDto {
  @ApiProperty({ example: 'Mobile legends2', required: false })
  @IsString()
  @IsOptional()
  game_name?: string;

  @ApiProperty({ example: 'A game', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}