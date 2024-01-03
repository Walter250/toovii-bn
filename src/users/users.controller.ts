import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dtos/newUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { User } from './user.entity';
import { currentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/who')
  // who(@Session() session: any) {
  //   return this.userService.findOne(session.userId);
  // }

  @Get('/who')
  @UseGuards(AuthGuard)
  who(@currentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: NewUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async signin(@Body() body: UserLoginDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/users')
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
