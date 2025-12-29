import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async signup(createUserDto: CreateUserDto) {
        const { email, password, firstName, lastName, role } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = new this.userModel({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            });
            return await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User with this email already exists');
            }
            throw error;
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
