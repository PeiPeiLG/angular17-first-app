import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations'; // API URL

  constructor() {}

  // 取得所有資料
  async getHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  // 取得單一筆資料
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  // 送出申請表單
  submitAppLication(firstName: string, lastName: string, email: string) {
    console.log('Application submitted', { firstName, lastName, email });
  }
}
