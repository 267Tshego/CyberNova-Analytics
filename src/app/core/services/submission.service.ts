import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private api = environment.submissionApi;
  constructor(private http: HttpClient) {}

  submitContactForm(data: any): Observable<any> {
    return this.http.post(`${this.api}/contact`, data);
  }
  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/all`);
  }
  filterRequests(issueType?: string, country?: string): Observable<any[]> {
    const params: any = {};
    if (issueType) params['issueType'] = issueType;
    if (country)   params['country'] = country;
    return this.http.get<any[]>(`${this.api}/filter`, { params });
  }
  updateRequestStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.api}/${id}/status`, { status });
  }
  getServiceAnalytics(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.api}/analytics/services`);
  }
  getRegionAnalytics(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.api}/analytics/regions`);
  }
  getTrendAnalytics(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.api}/analytics/trends`);
  }
}
