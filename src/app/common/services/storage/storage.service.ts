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
   * Assign user to a group and save it in local storage
   */
  public assignToGroup(group: any) {
    this.setItem(STORAGE_KEYS.groups, group);
  }

  /**
   * Assign user to a room and save it in local storage
   */
  public assignToRoom(room: any) {
    this.setItem(STORAGE_KEYS.rooms, room);
  }
}


