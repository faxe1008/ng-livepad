import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class LivePadService {
    uuid: string;
    users: User[] = [];

    getUserByName(name: string): User{
        for(var i=0; i< this.users.length; i++){
            if(this.users[i].name == name){
                return this.users[i];
            }   
        }
        return null;
    }

}