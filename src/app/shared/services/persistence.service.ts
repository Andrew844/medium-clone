import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log('[Error]: Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.log('[Error]: Error getting data from localStorage', e);
      return null;
    }
  }
}
