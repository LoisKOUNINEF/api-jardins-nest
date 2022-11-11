import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    return this.usersRepository.save({ ...user, ...updateUserDto });

    // alternative but only returns the query result, not the updated user
    // return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);

    // alternative but only returns the query result, not the deleted user
    // return this.usersRepository.delete(id)
  }
}
