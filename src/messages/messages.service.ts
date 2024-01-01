import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { NewMessageDto } from './message.dto';
import { MessageProperties } from 'interfaces';

@Injectable()
export class MessagesService {
    constructor(@InjectRepository(Message) private repo: Repository<Message>){}

    getAll(){
        return this.repo.find()
    }

    create(message: NewMessageDto){
        const newMessage = this.repo.create({...message, isAnswered: false})
        return this.repo.save(newMessage)
    }

    delete(id:number){

    }
}
