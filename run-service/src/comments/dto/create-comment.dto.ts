import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'run-uuid' })
  @IsString()
  @IsNotEmpty()
  run_id: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'WOW!' })
  @IsString()
  @IsNotEmpty({ message: 'Comment must be filled' })
  comment: string;
}