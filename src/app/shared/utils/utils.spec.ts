import { pluck, range } from "./utils";

describe('utils', () => {
    it('Returns a range from 1 to 5', ()=> {
        const actual = range(1,5);

        expect(actual).toEqual([1,2,3,4]);
    });

    it('plucks id from object', () => {
        const records = [
            {id: 1, foo: "bar"},
            {id: 2, foo: "bat"},
            {id: 3, foo: "baq"},
        ];

        const actual = pluck(records, 'id');

        expect(actual).toEqual([1,2,3]);
    });
});