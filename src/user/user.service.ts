import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ auth0_id: createUserDTO.auth0_id })
      .exec();
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async getUserByAuth0Id(auth0_id): Promise<User> {
    const user = await this.userModel.findOne({ auth0_id: auth0_id }).exec();
    return user;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async editUser(auth0_id, createUserDTO: CreateUserDTO): Promise<User> {
    const editedUser = await this.userModel.findOneAndUpdate(
      { auth0_id: auth0_id },
      createUserDTO,
      { new: true },
    );
    return editedUser;
  }

  async deleteUser(auth0_id): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(auth0_id);
    return deletedUser;
  }
}
