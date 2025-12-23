import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { Role, RoleSchema } from 'src/roles/roles.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name : Role.name, schema: RoleSchema }
        ])
    ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
