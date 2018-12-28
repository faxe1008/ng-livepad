import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { EncryptionService } from 'angular-encryption-service';
import { UUID } from 'angular2-uuid';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class LivePadService {
    uuid: string;
    users: User[] = [];
    encryptionKey: string;
    userStream: ReplaySubject<User> = new ReplaySubject();

    constructor(private _encryptionService: EncryptionService) {
        this.uuid = UUID.UUID();
        this.encryptionKey = this.randomString(12, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');        
    }

    onUserJoined(): Observable<User> {
        return this.userStream.asObservable();
    }

    joinUser(user: User){
        this.users.push(user);
        this.userStream.next(user);
    }

    encryptMessage(message: string) {
        return this._encryptionService.generateKey(this.encryptionKey).then(key => {
            console.log(key)
            return this._encryptionService.encrypt(message, key);
        });
    }

    decryptMessage(message: string) {
        return this._encryptionService.generateKey(this.encryptionKey).then(key => {
            return this._encryptionService.decrypt(message, key);
        });
    }

    randomString(len, charSet): string {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < len; i++) {
            const randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    getUserByName(name: string): User {
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].name === name){
                return this.users[i];
            }   
        }
        return null;
    }

}
