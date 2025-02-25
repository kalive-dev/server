import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Attributes } from 'sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, name, password } = createUserDto;

      const userExists = await this.userModel.findOne({ where: { email } });
      if (userExists) {
        throw new BadRequestException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        email,
        name,
        password: hashedPassword,
      } as Attributes<User>);

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const userData = user.dataValues;

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = await this.jwtService.signAsync(
        { id: userData.id },
        { secret: process.env.JWT_SECRET },
      );
      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
