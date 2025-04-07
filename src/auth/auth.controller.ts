import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the user in the response',
  })
  @Post('register')
  async register(@Body() payload: RegisterDTO) {
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDTO) {
    return this.authService.login(payload);
  }
}
