import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';

@Controller('api/users')
export class UserController {

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@GetUser() user: User) {
        return user;
    }
}
