import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        [alt]="housingLocation?.name"
      />
      <!-- 介紹區塊 -->
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <!-- 特色區塊 -->
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Dose this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <!-- 申請表單區塊 -->
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitAppLication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button class="primary" type="submit">Apply</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute); // 路由
  housingService = inject(HousingService); // HousingService服務
  housingLocation: HousingLocation | undefined; // 顯示資料
  // 申請表單
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    // 取得路由參數
    const housingLocationId = Number(this.route.snapshot.params['id']);
    // 使用 id 取得 housingLocation 資料
    this.housingService.getHousingLocationById(housingLocationId).then(
      (housingLocation: HousingLocation | undefined) => {
        this.housingLocation = housingLocation;
      }
    );
  }
  // 送出申請表單
  submitAppLication() {
    this.housingService.submitAppLication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
