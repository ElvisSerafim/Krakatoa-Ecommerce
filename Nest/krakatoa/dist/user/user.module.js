"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt_1 = require("bcrypt");
const jwt_strategy_1 = require("./jwt.strategy");
const logger = new common_1.Logger('User Module');
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: '2e97eb810387ab8e9c4d399e2daa2a78564e4d8a352c0b2e34968acd25ad8b24a940898397bbef69ef1c16c5c7efdca6',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_schema_1.User.name,
                    useFactory: async function () {
                        const schema = user_schema_1.UserSchema;
                        schema.pre('save', async function (next) {
                            try {
                                if (!this.isModified('password'))
                                    return next();
                                const salt = await bcrypt_1.genSalt(10);
                                const Hash = await bcrypt_1.hash(this.password, salt);
                                this.password = Hash;
                                logger.log('Ok!');
                                return next();
                            }
                            catch (error) {
                                logger.error(error);
                                return next(error);
                            }
                        });
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map