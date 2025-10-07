import { UserInteface } from "../types/user.interface";
import { UsersService } from "./users.service";
import { TestBed } from "@angular/core/testing";
import { UtilsService } from "./utils.service";

describe('UsersService', () => {
    let usersService: UsersService;
    let utilsService: UtilsService;
    // let utilsServiceMock = {
    //     pluck: jest.fn(),
    // };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersService,
                UtilsService
                // { provide: UtilsService, useValue: utilsServiceMock }
            ]
        });

        usersService = TestBed.inject(UsersService);
        utilsService = TestBed.inject(UtilsService);
        usersService.users$.next([{
            id: '1',
            name: "Foo"
        }]);
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

        expect(usersService.users$.getValue()).toEqual([{
            id: '1',
            name: "Foo"
        }, newUser]);
    });

    it('Removes an user', () => {
        usersService.removeUser("1");

        expect(usersService.users$.getValue()).toEqual([]);
    });
    
    it('Gets the usernames', () =>{
        // utilsServiceMock.pluck.mockReturnValue(["João", "Maria"]);

        // const actual = usersService.getUsernames();

        // expect(actual).toEqual(["João", "Maria"]);

        jest.spyOn(utilsService, "pluck");

        usersService.getUsernames();

        expect(utilsService.pluck).toHaveBeenCalledWith(
            usersService.users$.getValue(),
            "name"
        );
    });
});