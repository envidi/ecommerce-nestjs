import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDTO) {
    const existUser = await this.userRepository.findOneBy({
      email: payload.email,
    });
    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const createdUser = this.userRepository.create(payload);
    return this.userRepository.save(createdUser);
  }

  async login(payload: LoginDTO) {
    const user = await this.userRepository.findOneBy({
      email: payload.email,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const comparePassword = bcrypt.compareSync(payload.password, user.password);
    if (!comparePassword) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
    return {
      accessToken,
    };
  }
}
