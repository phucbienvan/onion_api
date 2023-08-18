import { Optional } from "@nestjs/common"
import { IsNotEmpty, IsString } from "class-validator"

export class UpdateNoteDTO {
    @IsString()
    @Optional()
    title?: string;

    @IsString()
    @Optional()
    description?: string;

    @IsString()
    @Optional()
    url?: string;
}
