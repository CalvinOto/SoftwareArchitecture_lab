import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Any%', required: false })
  @IsString()
  @IsOptional()
  run_category_name?: string;
}