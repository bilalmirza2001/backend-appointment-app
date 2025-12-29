import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: 'secret-key-123-login',
        signOptions: { expiresIn: '1h' },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
