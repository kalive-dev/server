import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/schemas/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const response = await this.authService.register(createUserDto);
    return new ApiResponse(
      'success',
      'You was register with succusses',
      response,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const response = await this.authService.login(body.email, body.password);
    return new ApiResponse(
      'success',
      'You was loggined succssesfuly',
      response,
    );
  }
}
