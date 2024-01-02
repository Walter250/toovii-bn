import { IsEmail, IsOptional, IsString } from 'class-validator';

export class NewUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  affiliateReference: string;

  @IsString()
  password: string;
}
