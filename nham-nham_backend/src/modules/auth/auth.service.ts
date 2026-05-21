import { Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth-repository';
import { SignUpUserDTO } from './dto/sign-up-user.dto';
import { SignInUserDTO } from './dto/sign-in-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) { }
    
    async signUp(signUpUserPayLoad: SignUpUserDTO) {
        const token = await this.authRepository.signUp(signUpUserPayLoad);
        return token;
    }

    async signIn(signInUserPayLoad: SignInUserDTO) {
        const token = await this.authRepository.signIn(signInUserPayLoad);
        return token;
    }

    async getUser(userId: string, email: string) {
        const user = await this.authRepository.getProfile(userId, email);
        return user;
    }
}
