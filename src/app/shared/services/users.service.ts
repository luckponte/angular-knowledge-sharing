import { inject, Injectable } from '@angular/core';
import { UserInteface } from '../types/user.interface';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UsersService {
  utilsService = inject(UtilsService);
  // users: UserInteface[] = [];
  users$ = new BehaviorSubject<UserInteface[]>([]);

  addUser(user: UserInteface): void {
    // this.users = [...this.users, user];

    this.users$.next([...this.users$.getValue(), user]);
  }

  removeUser(userId: string): void {
    // const updatedUsers = this.users.filter((user) => userId !== user.id);
    // this.users = updatedUsers;

    const updatedUsers = this.users$.getValue().filter((user) => userId !== user.id);

    this.users$.next(updatedUsers);
  }

  getUsernames() :string[] {
    return this.utilsService.pluck(this.users$.getValue(), 'name');
  }
}
