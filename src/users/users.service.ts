import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NewUserDto } from './dtos/newUser.dto';
import { Permission } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(userInfo: NewUserDto) {
    console.log(userInfo.affiliateReference);
    const user = userInfo.affiliateReference
      ? this.repo.create({ ...userInfo, permission: Permission.USER })
      : this.repo.create({
          ...userInfo,
          permission: Permission.USER,
          affiliateReference: null,
        });
    return this.repo.save(user);
  }

  getAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    const user = this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with Id ${id} Not Found`);
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const currentUser = await this.findOne(id);
    if (!currentUser) {
      throw new NotFoundException(`User with Id ${id} Not Found`);
    }
    Object.assign(currentUser, attrs);
    return this.repo.save(currentUser);
  }

  async remove(id: number) {
    const currentUser = await this.findOne(id);
    if (!currentUser) {
      throw new NotFoundException(`User with Id ${id} Not Found`);
    }
    return this.repo.remove(currentUser);
  }
}
