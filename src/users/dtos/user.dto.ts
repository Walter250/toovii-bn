import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Permission } from 'src/interfaces';

export class UserDto {
  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  dateOfBirth: string;

  @Expose()
  phone: string;

  @Expose()
  affiliateReference: string;

  @Expose()
  permission: Permission;
}
