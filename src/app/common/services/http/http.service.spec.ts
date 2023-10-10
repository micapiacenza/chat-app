import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After each test, verify that there are no outstanding requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request', () => {
    const testData = { message: 'GET request successful' };
    const url = 'test';

    service.get(url).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service.baseUrl + url);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should send a POST request', () => {
    const testData = { message: 'POST request successful' };
    const url = 'test';
    const body = { data: 'test' };

    service.post(url, body).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service.baseUrl + url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(body);
    req.flush(testData);
  });

  it('should send a PUT request', () => {
    const testData = { message: 'PUT request successful' };
    const url = 'test';
    const body = { data: 'test' };

    service.put(url, body).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service.baseUrl + url);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(body);
    req.flush(testData);
  });

  it('should send a DELETE request', () => {
    const testData = { message: 'DELETE request successful' };
    const url = 'test';

    service.delete(url).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = httpTestingController.expectOne(service.baseUrl + url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(testData);
  });
});
