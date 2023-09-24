import {Injectable} from '@angular/core';

export enum STORAGE_KEYS {
  groups = 'groups',
  rooms = 'rooms',
  users = 'users',
  currentUser = 'currentUser',
}


@Injectable({
  providedIn: 'root'
})

export class StorageService {

  /**
   * Retrieve from local storage
   */
  public getItem(key: STORAGE_KEYS) {
    try {
      return JSON.parse(window.localStorage.getItem(key) ?? '');
    } catch {
      return undefined;
    }
  }

  /**
   * Set item in local storage
   */
  public setItem(key: STORAGE_KEYS, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Delete item from local storage
   * @param key
   */
  public deleteItem(key: STORAGE_KEYS) {
    window.localStorage.removeItem(key);
  }
}


