import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { SignUpUserDTO } from "../dto/sign-up-user.dto";
import { User } from "../entities/user.entity";
import { IAuthRepository } from "../interface/auth.repository.interface";
import { Token } from "../interface/sign-up-user-response";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { SignInUserDTO } from "../dto/sign-in-user.dto";

type payLoad = {
    sub: string;
    email: string;
}

@Injectable()
export class AuthRepository implements IAuthRepository{
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }
    async getProfile(userId: string, email: string): Promise<User> {
        const userExist = await this.userRepository.findOne({
            where: {
                id: userId,
                email: email,
            }
        }); 

        if (!userExist) {
            throw new HttpException(`User With Email ${email} Not Found`, HttpStatus.NOT_FOUND);
        }

        return userExist;
    }
    
    async signIn(signInUserPayLoad: SignInUserDTO): Promise<Token> {
        const { email, password } = signInUserPayLoad; 
        
        const isExisted = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
        
        if (!isExisted) {
            throw new HttpException("User It Not Exist You Must Sign Up First", HttpStatus.NOT_FOUND);
        }

        const isMatched = await bcrypt.compare(password, isExisted.password);

        if (!isMatched) {
            throw new HttpException("Invalid Password", HttpStatus.UNAUTHORIZED);
        }

        const payLoad = this.buildPayload(isExisted.id!, isExisted.email);
        const token = this.signToken(payLoad);
        const refreshToken = this.signRefreshToken(payLoad);
        return {
            token,
            refreshToken,
        }
    }
    
    async signUp(signUpUserPayLoad: SignUpUserDTO): Promise<Token> {
        const { password } = signUpUserPayLoad;
        const saltRound = 10;

        const hashPassword = await bcrypt.hash(password, saltRound);
        const user = await this.userRepository.save(
            this.userRepository.create({
                ...signUpUserPayLoad,
                password: hashPassword,
                location: null,
            })
        );
        const payLoad = this.buildPayload(user.id!, user.email);
        const token = this.signToken(payLoad);
        const refreshToken = this.signRefreshToken(payLoad);
        return {
            token,
            refreshToken,
        }
    }
    
    private buildPayload(userid: string , email: string) : payLoad {
        return {
            sub: userid,
            email: email,
        }
    }

    

    private signToken(payLoad: payLoad) {
        const token = this.jwtService.sign(
            payLoad,
            {
                secret: this.configService.get("JWT_SECRET"),
                expiresIn: this.configService.get("JWT_TOKEN_EXPIRE_IN"),
            },
        );  
        return token;
    }

    private signRefreshToken(payLoad: payLoad) {
        const refreshToken = this.jwtService.sign(
            payLoad,
            {
                secret: this.configService.get("JWT_SECRET"),
                expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRE_IN")
            }
        );
        return refreshToken;
    }


}