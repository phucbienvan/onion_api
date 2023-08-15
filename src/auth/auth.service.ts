import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {

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
            if(error.code == 'P2002') {
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }
        }
    }

    login() {
        
    }
}
