import { HousingService } from './../housing.service';
import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <!-- 搜尋區塊 -->
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <!-- 內容區塊-->
    <section class="results">
      @for(item of filteredLocationList; track item){
      <app-housing-location [housingLocation]="item" />
      }
    </section>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []; // 主要內容list
  housingService: HousingService = inject(HousingService); // 服務
  filteredLocationList: HousingLocation[] = []; // 搜尋後的list

  constructor() {
    // 從HousingService取得資料
    this.housingService
      .getHousingLocations()
      .then((housingLocation: HousingLocation[]) => {
        this.housingLocationList = housingLocation; // 資料放入主要內容list
        this.filteredLocationList = housingLocation; // 資料放入搜尋後的list
      });
  }
  
  // 搜尋功能
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
