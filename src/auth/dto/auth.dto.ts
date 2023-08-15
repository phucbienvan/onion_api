import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}
