import { IsBoolean, IsEmail,IsString } from "class-validator";

export class NewMessageDto { 
    @IsString()
    firstname: string
    
    @IsString()
    lastname: string
    
    @IsEmail()
    email: string

    @IsString()
    phone: string

    @IsString()
    message: string
}