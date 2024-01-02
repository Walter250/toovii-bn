import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  affiliateReference: string;

  @IsOptional()
  @IsString()
  password: string;
}
