import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ example: 'category-uuid' })
  @IsString()
  @IsNotEmpty()
  run_category_id: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=xxx' })
  @IsString()
  @IsNotEmpty({ message: 'VOD URL must be filled' })
  vod_url: string;

  @ApiProperty({ example: 3661 })
  @IsNumber()
  run_duration: number;
}