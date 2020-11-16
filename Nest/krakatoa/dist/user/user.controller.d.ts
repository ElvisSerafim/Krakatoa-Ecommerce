import { UserService } from './user.service';
import { userResponse } from '../utils/types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(createUserdto: CreateUserDto): Promise<{
        accessToken: string;
    }>;
    Login(loginUserDto: LoginUserDto): Promise<{
        accessToken: string;
    }>;
    Forgot(email: string): Promise<void>;
    Recover(id: string, newPassword: string): Promise<{
        accessToken: string;
    }>;
    updateDetailUser(user: User, detailsUserDto: DetailsUserDto): Promise<void>;
    GetUser(user: User): Promise<userResponse>;
    updateEndeUser(user: User, updateUserDto: UpdateUserDto): Promise<void>;
}
