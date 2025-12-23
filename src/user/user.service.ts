import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Role, RoleDocument } from 'src/roles/roles.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async createUser(data: Partial<User>): Promise<User> {
        if (data.role) {
            const roleId = await this.resolveRole(data.role as any);
            data.role = roleId as any;
        }

        const newUser = new this.userModel(data);
        return newUser.save();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().populate('role').exec();
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id).populate('role').exec();
    }

    async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        if (data.role) {
            const roleId = await this.resolveRole(data.role as any);
            data.role = roleId as any;
        }

        return this.userModel.findByIdAndUpdate(id, data, { new: true }).populate('role').exec();
    }

    async patchUser(id: string, data: Partial<User>): Promise<User | null> {
        if (data.role) {
            const roleId = await this.resolveRole(data.role as any);
            data.role = roleId as any;
        }

        return this.userModel.findByIdAndUpdate(id, data, { new: true }).populate('role').exec();
    }

    async deleteUser(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }   

    private async resolveRole(roleInput: string | any) {
        if (typeof roleInput === 'string') {
            if (isValidObjectId(roleInput)) {
                const role = await this.roleModel.findById(roleInput).exec();
                if (role) return role._id;
            }

            const roleByName = await this.roleModel.findOne({ roleName: roleInput }).exec();
            if (roleByName) return roleByName._id;
        }

        if (roleInput && roleInput._id) {
            if (isValidObjectId(roleInput._id)) return roleInput._id;
        }

        throw new BadRequestException('Invalid role provided');
    }
}
