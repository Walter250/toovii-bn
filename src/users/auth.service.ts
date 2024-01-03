import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dtos/newUser.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserLoginDto } from './dtos/user-login.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(userInfo: NewUserDto) {
    const users = await this.usersService.findEmail(userInfo.email);
    const usernames = await this.usersService.findUserName(userInfo.username);
    if (users.length) {
      throw new BadRequestException('Email already in Use');
    }
    if (usernames.length) {
      throw new BadRequestException('Username already in Use');
    }

    //Salting and Hashing Processes
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userInfo.password, salt, 35)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    return this.usersService.create({
      ...userInfo,
      password: hashedPassword,
    });
  }

  async signin(loginInfo: UserLoginDto) {
    const [user] = await this.usersService.findEmail(loginInfo.email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const [salt, hashedPassword] = user.password.split('.');
    const hash = (await scrypt(loginInfo.password, salt, 35)) as Buffer;

    if (hashedPassword !== hash.toString('hex')) {
      throw new ForbiddenException('Wrong password');
    }
    return user;
  }
}
