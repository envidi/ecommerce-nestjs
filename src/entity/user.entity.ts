import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    example: 'phanm711996@gmail.com',
    description: 'Provide the email of the user',
  })
  @Column()
  email: string;

  @ApiProperty({
    example: '******',
    description: 'Provide the password of the user',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    example: 'envidi',
    description: 'Provide the name of the user',
  })
  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GUEST,
  })
  role: Role;

  @BeforeInsert()
  hashPassword() {
    const saltRound = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const saltPassword = bcrypt.genSaltSync(saltRound);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    this.password = bcrypt.hashSync(this.password, saltPassword);
  }
}
