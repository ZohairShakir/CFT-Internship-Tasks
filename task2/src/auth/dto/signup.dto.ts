import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  /**
   * Role defaults to User when omitted.
   * Pass "Admin" during signup to create an admin account for testing.
   */
  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either Admin or User' })
  role?: Role;
}
