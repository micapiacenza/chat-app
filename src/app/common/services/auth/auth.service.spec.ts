import { TestBed } from '@angular/core/testing';
import {AuthService} from "./auth.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpService} from "../http/http.service";
import {StorageService} from "../storage/storage.service";
import {of} from "rxjs";
import {UserInterface} from "../../interfaces/user.interface";
import {Roles} from "../../interfaces/roles";
import {Router} from "@angular/router";

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpService: HttpService;
  const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'setItem', 'deleteItem']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthService,
        { provide: HttpService, useValue: httpService },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    httpService = TestBed.inject(HttpService);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send a POST request to register a user', () => {
    const user: UserInterface = {
      id: '1',
      username: 'mockuser',
      email: 'mockuser@example.com',
      pwd: 'password123',
      role: Roles.superAdmin,
      groups: [],
    };
    // Set up the HttpService spy to return an observable
    spyOn(httpService, 'post').and.returnValue(of({ message: 'User registered successfully' }));

    service.register(user).subscribe();

    // Verify that the post method of httpService is called
    expect(httpService.post).toHaveBeenCalledWith('auth/register', user);
  });
});
