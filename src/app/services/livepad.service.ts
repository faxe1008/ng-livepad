import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class LivePadService {
    uuid: string;
    users: User[] = [];
}