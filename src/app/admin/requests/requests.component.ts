import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SubmissionService } from '../../core/services/submission.service';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, DatePipe],
  template: `
    <div class="admin-shell">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <img src="assets/logo.png" alt="CyberNova" class="sidebar-logo">
          <div class="sidebar-brand-text">
            <span class="sb-name">CYBERNOVA</span>
            <span class="sb-sub">Admin Portal</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <p class="nav-section-label">Main</p>
          <a routerLink="/admin/dashboard"  routerLinkActive="active">Dashboard</a>
          <a routerLink="/admin/requests"   routerLinkActive="active">Requests</a>
          <a routerLink="/admin/analytics"  routerLinkActive="active">Analytics</a>
          <p class="nav-section-label">Content</p>
          <a routerLink="/admin/content"    routerLinkActive="active">Content Manager</a>
          <p class="nav-section-label">Account</p>
          <a routerLink="/" class="nav-view-site">View Site</a>
          <button class="nav-logout" (click)="logout()">Logout</button>
        </nav>
      </aside>

      <div class="admin-main">
        <div class="admin-topbar">
          <div>
            <h1 class="page-title">Security Requests</h1>
            <p class="page-subtitle">All client security submissions — filter, review and update status</p>
          </div>
          <div class="topbar-right">
            <span class="count-badge">{{ filtered.length }} request{{ filtered.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters-bar">
          <div class="filter-group">
            <label>Issue Type</label>
            <select [(ngModel)]="filterType" (ngModelChange)="applyFilters()">
              <option value="">All Types</option>
              @for (t of issueTypes; track t) { <option [value]="t">{{ t }}</option> }
            </select>
          </div>
          <div class="filter-group">
            <label>Country</label>
            <select [(ngModel)]="filterCountry" (ngModelChange)="applyFilters()">
              <option value="">All Countries</option>
              @for (c of countries; track c) { <option [value]="c">{{ c }}</option> }
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select [(ngModel)]="filterStatus" (ngModelChange)="applyFilters()">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <button class="clear-btn" (click)="clearFilters()">Reset</button>
        </div>

        <!-- Table -->
        <div class="content-card">
          @if (loading) {
            <div class="table-loading">
              <div class="spinner"></div> Loading requests...
            </div>
          }
          @if (!loading && filtered.length === 0) {
            <div class="table-empty">
              <span>📭</span>
              <p>No requests match the selected filters.</p>
            </div>
          }
          @if (!loading && filtered.length > 0) {
            <div class="table-wrapper">
              <table>
                <thead>
                <tr>
                  <th>Client</th><th>Issue Type</th><th>Country</th>
                  <th>Submitted</th><th>Status</th><th>Update</th>
                </tr>
                </thead>
                <tbody>
                  @for (r of filtered; track r.id) {
                    <tr (click)="selected = selected?.id === r.id ? null : r" [class.row-active]="selected?.id === r.id">
                      <td>
                        <div class="client-cell">
                          <div class="client-avatar">{{ r.fullName?.charAt(0) }}</div>
                          <div>
                            <div class="client-name">{{ r.fullName }}</div>
                            <div class="client-sub">{{ r.organization || r.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td><span class="type-pill">{{ r.issueType }}</span></td>
                      <td>{{ r.country }}</td>
                      <td class="date-cell">
                        {{ r.submittedAt?.seconds * 1000 | date:'dd MMM yyyy' }}
                      </td>
                      <td>
                        <span class="status-pill" [class]="r.status">{{ r.status }}</span>
                      </td>
                      <td (click)="$event.stopPropagation()">
                        <select class="inline-select" [value]="r.status"
                                (change)="updateStatus(r.id, $any($event.target).value)">
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                    <!-- Inline detail row -->
                    @if (selected?.id === r.id) {
                      <tr class="detail-row">
                        <td colspan="6">
                          <div class="detail-panel">
                            <div class="detail-grid">
                              <div class="detail-item"><label>Email</label><span>{{ r.email }}</span></div>
                              <div class="detail-item"><label>Phone</label><span>{{ r.phone || '—' }}</span></div>
                              <div class="detail-item"><label>Job Title</label><span>{{ r.jobTitle || '—' }}</span></div>
                              <div class="detail-item"><label>Organisation</label><span>{{ r.organization || '—' }}</span></div>
                            </div>
                            <div class="detail-desc">
                              <label>Description</label>
                              <p>{{ r.description }}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    }
                  }
                </tbody>
              </table>
            </div>
          }
        </div>

        @if (toastMessage) {
          <div class="toast">✅ {{ toastMessage }}</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-shell { display: flex; min-height: 100vh; background: #f1f5f9; }
    .sidebar { width: 256px; background: var(--navy-dark); color: white; display: flex;
      flex-direction: column; flex-shrink: 0; position: sticky; top: 0;
      height: 100vh; overflow-y: auto; }
    .sidebar-brand { padding: 1.5rem; display: flex; align-items: center; gap: .75rem;
      border-bottom: 1px solid rgba(255,255,255,.06); }
    .sidebar-logo { height: 38px; filter: brightness(0) invert(1); }
    .sb-name { display: block; font-size: .8rem; font-weight: 800; letter-spacing: 1px; color: white; }
    .sb-sub  { display: block; font-size: .65rem; color: #7ea8d8; letter-spacing: .5px; }
    .sidebar-nav { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: .15rem; }
    .nav-section-label { font-size: .68rem; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #4a6380; padding: 1rem .75rem .4rem; }
    .sidebar-nav a, .nav-logout, .nav-view-site {
      display: flex; align-items: center; gap: .75rem; padding: .7rem .9rem;
      border-radius: var(--radius); color: #94a3b8; font-size: .88rem;
      font-weight: 500; transition: all .2s; cursor: pointer; text-decoration: none;
      background: none; border: none; width: 100%; text-align: left;
    }
    .sidebar-nav a:hover, .nav-logout:hover, .nav-view-site:hover { background: rgba(255,255,255,.06); color: white; }
    .sidebar-nav a.active { background: rgba(0,102,204,.25); color: #60a5fa; }
    .nav-icon { font-size: 1rem; }
    .nav-logout { color: #f87171; }

    .admin-main { flex: 1; padding: 2rem; overflow-y: auto; }
    .admin-topbar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .page-title    { font-size: 1.6rem; font-weight: 800; color: var(--navy-dark); }
    .page-subtitle { color: var(--text-muted); font-size: .9rem; margin-top: .25rem; }
    .count-badge { background: var(--blue); color: white; padding: .35rem .9rem;
      border-radius: 20px; font-size: .82rem; font-weight: 700; }

    .filters-bar { display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-end;
      background: white; padding: 1.25rem; border-radius: var(--radius-lg);
      border: 1px solid var(--border); margin-bottom: 1.5rem;
      box-shadow: var(--shadow-sm); }
    .filter-group { display: flex; flex-direction: column; gap: .35rem; }
    .filter-group label { font-size: .75rem; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: .5px; }
    .filter-group select { padding: .6rem 1rem; border: 2px solid var(--border);
      border-radius: var(--radius); font-size: .88rem;
      font-family: inherit; outline: none; min-width: 180px;
      background: var(--bg); transition: border-color .2s; }
    .filter-group select:focus { border-color: var(--blue); }
    .clear-btn { padding: .6rem 1.25rem; background: var(--bg); border: 2px solid var(--border);
      border-radius: var(--radius); font-size: .85rem; font-weight: 600;
      color: var(--text-muted); cursor: pointer; align-self: flex-end;
      transition: all .2s; }
    .clear-btn:hover { border-color: var(--blue); color: var(--blue); }

    .content-card { background: white; border-radius: var(--radius-lg); padding: 0;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
      overflow: hidden; }

    .table-loading { display: flex; align-items: center; gap: 1rem;
      justify-content: center; padding: 4rem; color: var(--text-muted); }
    .spinner { width: 28px; height: 28px; border: 3px solid var(--border);
      border-top-color: var(--blue); border-radius: 50%;
      animation: spin .8s linear infinite; flex-shrink: 0; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .table-empty { display: flex; flex-direction: column; align-items: center;
      gap: .75rem; padding: 5rem; color: var(--text-muted); }
    .table-empty span { font-size: 3rem; }

    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; min-width: 750px; }
    th { padding: .85rem 1.25rem; text-align: left; font-size: .72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px; color: var(--text-muted);
      background: #f8fafc; border-bottom: 2px solid var(--border); }
    td { padding: 1rem 1.25rem; font-size: .88rem; border-bottom: 1px solid #f8fafc;
      color: var(--text); }
    tr { cursor: pointer; transition: background .15s; }
    tr:hover td { background: #fafbfc; }
    tr.row-active td { background: var(--blue-light); }
    tr:last-child td { border-bottom: none; }

    .client-cell { display: flex; align-items: center; gap: .75rem; }
    .client-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--navy);
      color: white; font-weight: 700; font-size: .88rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .client-name { font-weight: 600; font-size: .88rem; color: var(--navy-dark); }
    .client-sub  { font-size: .76rem; color: var(--text-muted); }
    .date-cell { white-space: nowrap; color: var(--text-muted); }

    .type-pill { background: var(--blue-light); color: var(--blue);
      padding: .2rem .65rem; border-radius: 20px;
      font-size: .72rem; font-weight: 700; white-space: nowrap; }
    .status-pill { padding: .2rem .7rem; border-radius: 20px;
      font-size: .72rem; font-weight: 700; white-space: nowrap; }
    .status-pill.pending     { background: #fef9c3; color: #854d0e; }
    .status-pill.in-progress { background: #dbeafe; color: #1e40af; }
    .status-pill.resolved    { background: #dcfce7; color: #166534; }

    .inline-select { padding: .35rem .6rem; border: 1px solid var(--border);
      border-radius: 6px; font-size: .8rem; font-family: inherit;
      cursor: pointer; background: var(--bg); outline: none; }

    /* Detail panel */
    .detail-row td { padding: 0; cursor: default; background: var(--blue-light) !important; }
    .detail-panel { padding: 1.25rem 1.5rem; }
    .detail-grid { display: grid; grid-template-columns: repeat(4,1fr);
      gap: 1rem; margin-bottom: 1rem; }
    .detail-item label { display: block; font-size: .72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px;
      color: var(--text-muted); margin-bottom: .2rem; }
    .detail-item span  { font-size: .88rem; color: var(--navy-dark); font-weight: 500; }
    .detail-desc label { display: block; font-size: .72rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .5px;
      color: var(--text-muted); margin-bottom: .5rem; }
    .detail-desc p { font-size: .88rem; color: var(--text); line-height: 1.7;
      background: white; padding: .85rem 1rem; border-radius: var(--radius);
      border: 1px solid var(--border); }

    .toast { position: fixed; bottom: 2rem; right: 2rem; background: #166534;
      color: white; padding: .9rem 1.5rem; border-radius: var(--radius);
      font-weight: 600; font-size: .9rem; z-index: 1000;
      box-shadow: var(--shadow-lg); animation: slideIn .3s ease; }
    @keyframes slideIn { from { transform: translateY(1rem); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; } }
  `]
})
export class RequestsComponent implements OnInit {
  allRequests: any[] = [];
  filtered:    any[] = [];
  selected:    any   = null;
  loading      = true;
  toastMessage = '';
  filterType    = '';
  filterCountry = '';
  filterStatus  = '';

  issueTypes = ['Network Intrusion','Malware / Ransomware','Data Breach','Phishing Attack',
    'System Vulnerability','Denial of Service (DoS)','Insider Threat','Compliance Concern','Other'];
  countries  = ['Botswana','South Africa','Zimbabwe','Zambia','Namibia',
    'Mozambique','Tanzania','Malawi','Lesotho','Eswatini','Other'];

  constructor(private svc: SubmissionService, public adminService: AdminService) {}

  ngOnInit(): void {
    this.svc.getAllRequests().subscribe({
      next: data => { this.allRequests = data; this.filtered = data; this.loading = false; },
      error: ()  => { this.loading = false; }
    });
  }

  applyFilters(): void {
    this.filtered = this.allRequests.filter(r =>
      (!this.filterType    || r.issueType === this.filterType) &&
      (!this.filterCountry || r.country   === this.filterCountry) &&
      (!this.filterStatus  || r.status    === this.filterStatus)
    );
  }

  clearFilters(): void {
    this.filterType = ''; this.filterCountry = ''; this.filterStatus = '';
    this.filtered = this.allRequests;
  }

  updateStatus(id: string, status: string): void {
    this.svc.updateRequestStatus(id, status).subscribe({
      next: () => {
        const r = this.allRequests.find(x => x.id === id);
        if (r) r.status = status;
        this.applyFilters();
        this.toastMessage = `Status updated to: ${status}`;
        setTimeout(() => this.toastMessage = '', 3000);
      }
    });
  }

  logout(): void { this.adminService.logout(); }
}
