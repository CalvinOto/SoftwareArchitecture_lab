import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'game-uuid' })
  @IsString()
  @IsNotEmpty({ message: 'Game ID must be filled' })
  game_id: string;

  @ApiProperty({ example: 'zzz' })
  @IsString()
  @IsNotEmpty({ message: 'Run category name must be filled' })
  run_category_name: string;
}