import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string
  
  @Column()
  lastname: string
  
  @Column()
  email: string
  
  @Column()
  phone: string
  
  @Column()
  message: string
  
  @Column()
  isAnswered: boolean
}
