import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAdminDto } from './dto/signIn-admin.dto';
import { SignInMenegerDto } from './dto/signIn-meneger.dto';
import { SignInClientDto } from './dto/signIn-client.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { CreateMenegerDto } from '../meneger/dto/create-meneger.dto';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/admin')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @Post('signup/meneger')
  async signUpMeneger(
    @Body() createMenegerDto: CreateMenegerDto,
    @Res() res: Response,
  ) {
    return this.authService.signUpAdmin(createMenegerDto, res);
  }

  @Post('signup/client')
  async signUpClient(
    @Body() createClientDto: CreateClientDto,
    @Res() res: Response,
  ) {
    return this.authService.signUpClient(createClientDto, res);
  }

  @Post('signin/admin')
  async signInAdmin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res() res: Response,
  ) {
    return this.authService.signInAdmin(signInAdminDto, res)
  }

  @Post('signin/meneger')
  async signInMeneger(
    @Body() signInMenegerDto: SignInMenegerDto,
    @Res() res: Response,
  ) {
    return this.authService.signInMeneger(signInMenegerDto, res)
  }

  @Post('signin/client')
  async signInClient(
    @Body() signInClientDto: SignInClientDto,
    @Res() res: Response,
  ) {
    return this.authService.signInClient(signInClientDto, res)
  }

  @Post('signout/admin')
  async signOutAdmin(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @Post('signout/meneger')
  async signOutMeneger(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.signOutMeneger(refreshToken, res);
  }

  @Post('signout/client')
  async signOutClient(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.signOutClient(refreshToken, res);
  }

  @Post('refresh/admin')
  async refreshTokensAdmin(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.refreshTokensAdmin(refreshToken, res);
  }

  @Post('refresh/meneger')
  async refreshTokensMeneger(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.refreshTokensMeneger(refreshToken, res);
  }

  @Post('refresh/client')
  async refreshTokensClient(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.authService.refreshTokensClient(refreshToken, res);
  }
}
