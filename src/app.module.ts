import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { UserModule } from './user';
import { ProductModule } from './product';
import { JWTGlobalModule, SeedModule } from './common';
import { CategoryModule } from './category';

@Module({
  imports: [
    UserModule,
    ProductModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JWTGlobalModule,
    CategoryModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
