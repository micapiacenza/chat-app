import {Injectable} from '@angular/core';

export enum STORAGE_KEYS {
  groups = 'groups',
  channels = 'channels',
  users = 'users',
  currentUser = 'currentUser',
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {

// Retrieve from local storage
  public getItem<T>(key: STORAGE_KEYS): T | undefined {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch {
      return undefined;
    }
  }

  // Set
  public setItem(key: STORAGE_KEYS, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}


