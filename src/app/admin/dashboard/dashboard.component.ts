import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import { SubmissionService } from '../../core/services/submission.service';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, DatePipe, NgOptimizedImage],
  template: `
    <div class="admin-shell">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <img ngSrc="assets/logo2.png" alt="CyberNova" class="logo-img"
               width="48"
               height="64"
               priority
          >

          <div class="sidebar-brand-text">
            <span class="sb-name">CYBERNOVA</span>
            <span class="sb-sub">Admin Portal</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <p class="nav-section-label">Main</p>
          <a routerLink="/admin/dashboard" routerLinkActive="active">
           Dashboard
          </a>
          <a routerLink="/admin/requests" routerLinkActive="active">
            Requests
          </a>
          <a routerLink="/admin/analytics" routerLinkActive="active">
            Analytics
          </a>
          <p class="nav-section-label">Content</p>
          <a routerLink="/admin/content" routerLinkActive="active">
            Content Manager
          </a>
          <p class="nav-section-label">Account</p>
          <a routerLink="/" class="nav-view-site">
           View Site
          </a>
          <button class="nav-logout" (click)="logout()">
           Logout
          </button>
        </nav>
      </aside>

      <!-- Main -->
      <div class="admin-main">
        <div class="admin-topbar">
          <div>
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Overview of security requests and platform activity</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          @for (s of statCards; track s.label) {
            <div class="stat-card" [style.--accent]="s.color">
              <div class="stat-icon">{{ s.icon }}</div>
              <div class="stat-info">
                <div class="stat-value">{{ s.value }}</div>
                <div class="stat-label">{{ s.label }}</div>
              </div>
            </div>
          }
        </div>

        <!-- Recent requests -->
        <div class="content-card">
          <div class="card-head">
            <h2>Recent Requests</h2>
            <a routerLink="/admin/requests" class="view-all">View All →</a>
          </div>
          @if (loading) {
            <div class="table-loading">Loading requests...</div>
          }
          @if (!loading && recentRequests.length === 0) {
            <div class="table-empty">No requests submitted yet.</div>
          }
          @if (!loading && recentRequests.length > 0) {
            <div class="table-wrapper">
              <table>
                <thead>
                <tr>
                  <th>Client</th><th>Organisation</th>
                  <th>Issue Type</th><th>Country</th>
                  <th>Date</th><th>Status</th>
                </tr>
                </thead>
                <tbody>
                  @for (r of recentRequests; track r.id) {
                    <tr>
                      <td>
                        <div class="client-cell">
                          <div class="client-avatar">{{ r.fullName?.charAt(0) }}</div>
                          <div>
                            <div class="client-name">{{ r.fullName }}</div>
                            <div class="client-email">{{ r.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td>{{ r.organization || '—' }}</td>
                      <td><span class="type-pill">{{ r.issueType }}</span></td>
                      <td>{{ r.country }}</td>
                      <td class="date-cell">
                        {{ r.submittedAt?.seconds * 1000 | date:'dd MMM yyyy' }}
                      </td>
                      <td>
                        <span class="status-pill" [class]="r.status">{{ r.status }}</span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Shell ── */
    .admin-shell { display: flex; min-height: 100vh; background: #f1f5f9; }

    /* ── Sidebar ── */
    .sidebar {
      width: 256px; background: var(--navy-dark); color: white;
      display: flex; flex-direction: column; flex-shrink: 0;
      position: sticky; top: 0; height: 100vh; overflow-y: auto;
    }
    .sidebar-brand {
      padding: 1.5rem; display: flex; align-items: center; gap: .75rem;
      border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .sidebar-logo { height: 38px; filter: brightness(0) invert(1); }
    .sb-name { display: block; font-size: .8rem; font-weight: 800;
      letter-spacing: 1px; color: white; }
    .sb-sub  { display: block; font-size: .65rem; color: #7ea8d8; letter-spacing: .5px; }

    .sidebar-nav { padding: 1rem; flex: 1;
      display: flex; flex-direction: column; gap: .15rem; }
    .nav-section-label { font-size: .68rem; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #4a6380;
      padding: 1rem .75rem .4rem; }
    .sidebar-nav a, .nav-logout, .nav-view-site {
      display: flex; align-items: center; gap: .75rem;
      padding: .7rem .9rem; border-radius: var(--radius);
      color: #94a3b8; font-size: .88rem; font-weight: 500;
      transition: all .2s; cursor: pointer; text-decoration: none;
      background: none; border: none; width: 100%; text-align: left;
    }
    .sidebar-nav a:hover, .nav-logout:hover, .nav-view-site:hover {
      background: rgba(255,255,255,.06); color: white;
    }
    .sidebar-nav a.active { background: rgba(0,102,204,.25); color: #60a5fa; }
    .nav-icon  { font-size: 1rem; }
    .nav-logout { color: #f87171; margin-top: auto; }

    /* ── Main ── */
    .admin-main { flex: 1; padding: 2rem; overflow-y: auto; }
    .admin-topbar { display: flex; justify-content: space-between;
      align-items: flex-start; margin-bottom: 2rem; }
    .page-title    { font-size: 1.6rem; font-weight: 800; color: var(--navy-dark); }
    .page-subtitle { color: var(--text-muted); font-size: .9rem; margin-top: .25rem; }

    /* ── Stats ── */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem; margin-bottom: 2rem; }
    .stat-card {
      background: #1B2B4B; border-radius: var(--radius-lg); padding: 1.5rem;
      display: flex; gap: 1rem; align-items: center;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
    }
    .stat-icon  { font-size: 2rem; }
    .stat-value { font-size: 2rem; font-weight: 800; color: #ffffff; line-height: 1; }
    .stat-label { font-size: .8rem; color: #ffffff; margin-top: .25rem;
      text-transform: uppercase; letter-spacing: .5px; }

    /* ── Card ── */
    .content-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
    .card-head { display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 1.5rem; }
    .card-head h2 { font-size: 1.1rem; font-weight: 800; color: var(--navy-dark); }
    .view-all { color: var(--blue); font-size: .85rem; font-weight: 600; }

    .table-loading, .table-empty {
      text-align: center; padding: 3rem; color: var(--text-muted); }

    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; min-width: 700px; }
    th { padding: .75rem 1rem; text-align: left; font-size: .75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px; color: var(--text-muted);
      border-bottom: 2px solid var(--border); }
    td { padding: .9rem 1rem; font-size: .88rem; border-bottom: 1px solid #f8fafc;
      color: var(--text); }
    tr:hover td { background: #fafbfc; }
    tr:last-child td { border-bottom: none; }

    .client-cell { display: flex; align-items: center; gap: .75rem; }
    .client-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--navy);
      color: white; font-weight: 700; font-size: .85rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .client-name  { font-weight: 600; font-size: .88rem; color: var(--navy-dark); }
    .client-email { font-size: .78rem; color: var(--text-muted); }
    .date-cell { white-space: nowrap; color: var(--text-muted); }

    .type-pill { background: var(--blue-light); color: var(--blue);
      padding: .2rem .65rem; border-radius: 20px;
      font-size: .75rem; font-weight: 700; white-space: nowrap; }
    .status-pill { padding: .2rem .65rem; border-radius: 20px;
      font-size: .75rem; font-weight: 700; white-space: nowrap; }
    .status-pill.pending     { background: #fef9c3; color: #854d0e; }
    .status-pill.in-progress { background: #dbeafe; color: #1e40af; }
    .status-pill.resolved    { background: #dcfce7; color: #166534; }

    @media (max-width: 1024px) { .stats-row { grid-template-columns: repeat(2,1fr); } }
  `]
})
export class DashboardComponent implements OnInit {
  loading         = true;
  recentRequests: any[] = [];
  statCards: any[] = [];

  constructor(private svc: SubmissionService, public adminService: AdminService) {}

  ngOnInit() {
    this.svc.getAllRequests().subscribe(requests => {
      this.loading = false;
      this.recentRequests = requests.slice(0, 8);
      const pending   = requests.filter(r => r.status === 'pending').length;
      const resolved  = requests.filter(r => r.status === 'resolved').length;
      const countries = new Set(requests.map(r => r.country).filter(Boolean)).size;
      const counts: Record<string,number> = {};
      requests.forEach(r => r.issueType && (counts[r.issueType] = (counts[r.issueType]||0)+1));
      const top = Object.entries(counts).sort((a,b) => b[1]-a[1])[0]?.[0] ?? '—';
      const royalBlue = '#0066CC';

      this.statCards = [
        { label: 'Total Requests', value: requests.length, color: royalBlue },
        { label: 'Pending',        value: pending,          color: royalBlue },
        { label: 'Resolved',       value: resolved,         color: royalBlue },
        { label: 'Countries',      value: countries,        color: royalBlue },
      ];
    });
  }

  logout() { this.adminService.logout(); }
}
