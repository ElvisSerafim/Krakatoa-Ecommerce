import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtPayload } from './jwt-payload';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    constructor(userModel: Model<User>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
