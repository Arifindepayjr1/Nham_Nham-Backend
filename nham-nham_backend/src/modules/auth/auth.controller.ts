import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDTO } from './dto/sign-up-user.dto';
import { IAuthResponse } from './interface/sign-up-user-response';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('sign-up')
    async signUp(
        @Body() signUpUserPayLoad: SignUpUserDTO
    ) : Promise<IAuthResponse> {
        const signUpUser = await this.authService.signUp(signUpUserPayLoad);

        return {
            data: signUpUser,
            message: "Successfully SignUp User",
            status: HttpStatus.CREATED,
        }
    }

    @Post('sign-in')
    async signIn(
        @Body() signInUserPayLoad: SignInUserDTO,
    ): Promise<IAuthResponse>{
        const signInUser = await this.authService.signIn(signInUserPayLoad);
        return {
            data: signInUser,
            message: "Successfully SignIn User",
            status: HttpStatus.OK,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(
        @Req() request
    ) : Promise<IAuthResponse> {
        const user = await this.authService.getUser(request.user.sub, request.user.email);
        return {
            data: user,
            message: "Successfully Get Profile For User",
            status: HttpStatus.OK,
        }
    }
}
