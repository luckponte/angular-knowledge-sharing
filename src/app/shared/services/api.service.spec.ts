import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ApiService } from "./api.service";
import { TagInterface } from "../types/tag.interface";
import { HttpErrorResponse } from "@angular/common/http";

describe("ApiService", () => {
    let apiService: ApiService;
    let httpTestController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        apiService = TestBed.inject(ApiService);
        httpTestController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestController.verify();
    });

    it("creates service", () => {
        expect(apiService).toBeTruthy
    });

    it("gets tags", () => {
        let tags: TagInterface[] | undefined;
        let expectedTags: TagInterface[] = [{ id: '1', name: 'foo' }];

        apiService.getTags().subscribe((response: TagInterface[]) => {
            tags = response;
        });

        const request = httpTestController.expectOne('http://localhost:3004/tags');
        request.flush([{ id: '1', name: 'foo' }]);

        expect(tags).toEqual(expectedTags);
    });

    describe("createTag", () => {

        it("creates tags", () => {
            let tag: TagInterface | undefined;
            let expectedTag: TagInterface = { id: '1', name: 'foo' };

            apiService.createTag('foo').subscribe(response => {
                tag = response;
            });

            const request = httpTestController.expectOne('http://localhost:3004/tags');
            request.flush(expectedTag);

            expect(tag).toEqual(expectedTag);
            expect(request.request.method).toEqual("POST");
            expect(request.request.body).toEqual({ name: 'foo' });
        });

        it("handles tag creation errors", fakeAsync(() => {
            let actualError: HttpErrorResponse | undefined;
            apiService.createTag('foo').subscribe({
                next: () => {
                    throw new Error('Should fail');
                },
                error: (err) => {
                    actualError = err;
                }
            });

            const request = httpTestController.expectOne('http://localhost:3004/tags');
            request.flush({ message: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });

            tick();

            expect(actualError).toBeTruthy
            expect(actualError?.message).toEqual('Http failure response for http://localhost:3004/tags: 500 Internal Server Error')
        }));
    });

});