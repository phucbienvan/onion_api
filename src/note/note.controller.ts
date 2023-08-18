import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { GetUser } from 'src/auth/decorator';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/notes')
export class NoteController {
    constructor (private noteService: NoteService) {}

    @Get()
    index(@GetUser('id') userId: number) {
        return this.noteService.getListNoteByUser(userId);
    }

    @Get(':id')
    show(@Param('id') noteId: number) {        
        return this.noteService.show(noteId);
    }

    @Post('')
    store(
        @GetUser('id') userId: number, 
        @Body() insertNoteDTO: InsertNoteDTO
    ) {
        return this.noteService.store(userId, insertNoteDTO);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) noteId: number,
        @Body() updateNoteDTO: UpdateNoteDTO 
    ) {
        return this.noteService.update(noteId, updateNoteDTO)
    }

    @Delete(':id')
    delete(@Param('id') noteId: number) {
        return this.noteService.delete(noteId);
    }
}
