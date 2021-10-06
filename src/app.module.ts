import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/nestbackend',
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      logging: true,
      entities: [User],
      migrations: ['src/migration/**/*.ts'],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
