import { IsString, IsEmail, IsOptional, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'Phone must be a valid Indian mobile number' })
  phone?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  displayName!: string;

  @IsString()
  @IsOptional()
  city?: string;
}
