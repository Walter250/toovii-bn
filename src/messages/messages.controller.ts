import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { NewMessageDto } from './message.dto';

@Controller('messages')
export class MessagesController {
    constructor(private messageService: MessagesService){}

    @Get()
    getAll(){
        return this.messageService.getAll()
    }

    @Post()
    createMessage(@Body() message: NewMessageDto){
        return this.messageService.create(message)
    }
}
