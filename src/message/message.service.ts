import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor (private prismaService: PrismaService) {}
  clientToUser = {};

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.prismaService.message.create({
      data: {
        ...createMessageDto
      }
    });

    return message;
  }

  findAll() {
    return this.prismaService.message.findMany();
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
