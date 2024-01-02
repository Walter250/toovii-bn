import { Permission } from 'src/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: string;

  @Column()
  phone: string;

  @Column()
  affiliateReference: string | null;
  
  @Column()
  password: string;

  @Column()
  permission: Permission;
}
