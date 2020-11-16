import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private userModel;
    private jwtService;
    private logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    Recover(token: string, newPassword: string): Promise<{
        accessToken: string;
    }>;
    Forgot(email: string): Promise<void>;
    CreateUser(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    Login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    UpdateDetailUser(detailsUserDto: DetailsUserDto, user: User): Promise<void>;
    UpdateEndeUser(user: User, updateUserDto: UpdateUserDto): Promise<void>;
}
