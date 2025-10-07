import { UserInteface } from "../types/user.interface";
import { UsersService } from "./users.service";
import { TestBed } from "@angular/core/testing";

describe('UsersService', () => {
    let usersService: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UsersService]
        });

        usersService = TestBed.inject(UsersService);
        usersService.users = [{
            id: '1',
            name: "Foo"
        }];
    });

    it('Creates a service', () => {
        expect(usersService).toBeTruthy
    });

    it('Adds a new user', () => {
        const newUser: UserInteface = {
            id: '2',
            name: 'Bar'
        };

        usersService.addUser(newUser);

        expect(usersService.users).toEqual([{
            id: '1',
            name: "Foo"
        }, newUser]);
    });

    it('Removes an user', () => {
        usersService.removeUser("1");

        expect(usersService.users).toEqual([]);
    })
});