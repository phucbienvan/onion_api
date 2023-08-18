import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) {}

    getListNoteByUser(userId: number) {
        return this.prismaService.note.findMany({
            where: {
                userId
            }
        });
    }

    async store(userId: number, insertNoteDTO: InsertNoteDTO) {
        return await this.prismaService.note.create({
            data: {
                ...insertNoteDTO,
                userId
            }
        });
    }

    show(noteId: number) {
        console.log(typeof(noteId));
        
        return this.prismaService.note.findFirst({
            where: {
                id: Number(noteId)
            }
        });
    }

    update(noteId: number, updateNoteDTO: UpdateNoteDTO) {
        return this.prismaService.note.update({
            where: {
                id: noteId
            },
            data: {
                ...updateNoteDTO
            }
        });
    }

    delete(noteId: number) {
        return this.prismaService.note.delete({
            where: {
                id: Number(noteId)
            }
        });
    }
}
