import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {

    }

    async register(authDTO: AuthDTO) {
        const hashPassword = await argon.hash(authDTO.password);

        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashPassword,
                    firstName: '',
                    lastName: '',
                }, select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })

            return user
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }
        }
    }

    async login(authDTO: AuthDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDTO.email
            }
        });

        if (!user) {
            throw new ForbiddenException('try again');
        }

        const hashedPassword = await argon.verify(
            user.hashedPassword,
            authDTO.password
        );

        if (!hashedPassword) {
            throw new ForbiddenException('try again');
        }

        delete user.hashedPassword;

        return this.signJwt(user.id, user.email);
    }

    async signJwt(userId: number, email: string):Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            email
        }

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '3000m',
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            accessToken: accessToken,
        }
    }
}
