import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import {
  DashbordModels,
  MonthlySpends,
  SummaryCardData,
} from '../../features/user/dashboard/models/dashbord-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/dashboard`;

  getMonthlySpends(year: number | 0): Observable<MonthlySpends> {
    return this.http.get<MonthlySpends>(`${this.api}/mothlySpends`, {
      withCredentials: true,
      params: {
        year: (year = 0),
      },
    });
  }

  getSummaryCardData(): Observable<SummaryCardData> {
    return this.http.get<SummaryCardData>(`${this.api}/summaryData`, {
      withCredentials: true,
    });
  }

  getDashBoradData(): Observable<DashbordModels> {
    return this.http.get<DashbordModels>(`${this.api}`, {
      withCredentials: true,
    });
  }
}
