import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully!',
      user: newUser,
    });
  }

  @Get(':auth0_id')
  async getUser(@Res() res, @Param('auth0_id') auth0_id) {
    const user = await this.userService.getUserByAuth0Id(auth0_id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/users')
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Put('/edit')
  async editUser(
    @Res() res,
    @Query('auth0_id') auth0_id,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const editedUser = await this.userService.editUser(auth0_id, createUserDTO);
    if (!editedUser) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user: editedUser,
    });
  }

  @Delete('/delete')
  async deleteUser(@Res() res, @Query('auth0_id') auth0_id) {
    const deletedUser = await this.userService.deleteUser(auth0_id);
    if (!deletedUser) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user: deletedUser,
    });
  }
}
