import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
