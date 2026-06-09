import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = environment.adminApi;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, { username, password })
      .pipe(
        tap(res => localStorage.setItem('jwt_token', res.token))
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/admin/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  publishBlog(data: any): Observable<any> {
    return this.http.post(`${this.api}/blog`, data, {
      headers: this.getAuthHeaders()
    });
  }

  publishCaseStudy(data: any): Observable<any> {
    return this.http.post(`${this.api}/case-studies`, data, {
      headers: this.getAuthHeaders()
    });
  }

  addGalleryImage(data: any): Observable<any> {
    return this.http.post(`${this.api}/gallery`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getPendingTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/testimonials`, {
      headers: this.getAuthHeaders()
    });
  }

  approveTestimonial(id: string): Observable<any> {
    return this.http.put(`${this.api}/testimonials/${id}/approve`, {}, {
      headers: this.getAuthHeaders()
    });
  }
}
