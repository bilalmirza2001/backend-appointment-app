import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req: Request & { user: any }) {
        return req.user;
    }
}
