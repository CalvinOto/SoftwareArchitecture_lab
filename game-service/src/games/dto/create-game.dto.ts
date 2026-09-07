import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Mobile Legends' })
  @IsString()
  @IsNotEmpty({ message: 'Game name must be filled' })
  game_name: string;

  @ApiProperty({ example: 'A game' })
  @IsString()
  @IsNotEmpty({ message: 'Game description must be filled' })
  description: string;
}