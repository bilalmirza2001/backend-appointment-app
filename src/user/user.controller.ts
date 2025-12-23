import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get()
    async getUser(){
        return this.userService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: string){
        return this.userService.getUserById(id);
    }

    @Post()
    async addUser(@Body() data: Partial<User>){
        return this.userService.createUser(data);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Partial<User>){
        return this.userService.updateUser(id, data);
    }

    @Patch(':id')
    async patchUser(@Param('id') id: string, @Body() data: Partial<User>){
        return this.userService.patchUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(id);
    }
}
