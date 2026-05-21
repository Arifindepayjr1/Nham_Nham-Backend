import { SignInUserDTO } from "../dto/sign-in-user.dto";
import { SignUpUserDTO } from "../dto/sign-up-user.dto";
import { User } from "../entities/user.entity";
import { Token } from "./sign-up-user-response";

export interface IAuthRepository{
    signUp(signUpUserPayLoad: SignUpUserDTO): Promise<Token>
    signIn(signInUserPayLoad: SignInUserDTO): Promise<Token>
    getProfile(userId: string , email: string): Promise<User>
}