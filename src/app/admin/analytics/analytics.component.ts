import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { SubmissionService } from '../../core/services/submission.service';
import { AdminService } from '../../core/services/admin.service';
import {NgOptimizedImage} from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  template: `
    <div class="admin-shell">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <img ngSrc="assets/logo2.png" alt="CyberNova" class="logo-img"
               width="48"
               height="64"
               priority
          >          <div class="sidebar-brand-text">
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
            <h1 class="page-title">Analytics</h1>
            <p class="page-subtitle">Service demand, geographic distribution and request trends</p>
          </div>
        </div>

        <!-- KPI cards -->
        <div class="kpi-row">
          <div class="kpi-card">
            <div class="kpi-value">{{ total }}</div>
            <div class="kpi-label">Total Requests</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">{{ topService }}</div>
            <div class="kpi-label">Top Service</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">{{ topRegion }}</div>
            <div class="kpi-label">Top Region</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">{{ currentMonth }}</div>
            <div class="kpi-label">This Month</div>
          </div>
        </div>

        <!-- Charts -->
        <div class="charts-grid">
          <div class="chart-card">
            <div class="chart-header">
              <h3>Requests by Service Type</h3>
              <p>Most common cybersecurity issues submitted</p>
            </div>
            <div class="chart-body">
              <canvas #serviceChart></canvas>
            </div>
          </div>

          <div class="chart-card">
            <div class="chart-header">
              <h3>Geographic Distribution</h3>
              <p>Requests by country of origin</p>
            </div>
            <div class="chart-body">
              <canvas #regionChart></canvas>
            </div>
          </div>

          <div class="chart-card full">
            <div class="chart-header">
              <h3>Monthly Request Trend</h3>
              <p>Volume of security requests over time</p>
            </div>
            <div class="chart-body">
              <canvas #trendChart></canvas>
            </div>
          </div>
        </div>
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
    .sb-sub  { display: block; font-size: .65rem; color: #7ea8d8; }
    .sidebar-nav { padding: 1rem; flex: 1; display: flex; flex-direction: column; gap: .15rem; }
    .nav-section-label { font-size: .68rem; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; color: #4a6380; padding: 1rem .75rem .4rem; }
    .sidebar-nav a, .nav-logout, .nav-view-site {
      display: flex; align-items: center; gap: .75rem; padding: .7rem .9rem;
      border-radius: var(--radius); color: #94a3b8; font-size: .88rem;
      font-weight: 500; transition: all .2s; cursor: pointer;
      text-decoration: none; background: none; border: none; width: 100%; text-align: left;
    }
    .sidebar-nav a:hover, .nav-logout:hover { background: rgba(255,255,255,.06); color: white; }
    .sidebar-nav a.active { background: rgba(0,102,204,.25); color: #60a5fa; }
    .nav-icon  { font-size: 1rem; }
    .nav-logout { color: #f87171; }

    .admin-main { flex: 1; padding: 2rem; overflow-y: auto; }
    .admin-topbar { margin-bottom: 2rem; }
    .page-title    { font-size: 1.6rem; font-weight: 800; color: var(--navy-dark); }
    .page-subtitle { color: var(--text-muted); font-size: .9rem; margin-top: .25rem; }

    .kpi-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; margin-bottom: 2rem; }
    .kpi-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
      text-align: center; }
    .kpi-icon  { font-size: 2rem; margin-bottom: .75rem; }
    .kpi-value { font-size: 1.6rem; font-weight: 800; color: var(--navy-dark);
      line-height: 1; margin-bottom: .35rem; word-break: break-word; }
    .kpi-label { font-size: .75rem; color: var(--text-muted); font-weight: 600;
      text-transform: uppercase; letter-spacing: .5px; }

    .charts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .chart-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
    .chart-card.full { grid-column: 1 / -1; }
    .chart-header { margin-bottom: 1.25rem; }
    .chart-header h3 { font-size: 1rem; font-weight: 700; color: var(--navy-dark); }
    .chart-header p  { font-size: .82rem; color: var(--text-muted); margin-top: .2rem; }
    .chart-body canvas { max-height: 280px; }

    @media (max-width: 1024px) { .kpi-row { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 768px)  { .charts-grid { grid-template-columns: 1fr; } }
  `]
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('serviceChart') serviceRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('regionChart')  regionRef!:  ElementRef<HTMLCanvasElement>;
  @ViewChild('trendChart')   trendRef!:   ElementRef<HTMLCanvasElement>;

  total = 0; topService = '—'; topRegion = '—'; currentMonth = 0;
  private sData: Record<string,number> = {};
  private rData: Record<string,number> = {};
  private tData: Record<string,number> = {};
  private loaded = 0; private viewOk = false;

  constructor(private svc: SubmissionService, public adminService: AdminService) {}

  ngOnInit(): void {
    const done = () => { if (++this.loaded === 3) { this.tryDraw(); } };

    this.svc.getServiceAnalytics().subscribe(d => {
      this.sData = d;
      const e = Object.entries(d).sort((a,b) => b[1]-a[1]);
      this.total = e.reduce((s,[,v]) => s+v, 0);
      this.topService = e[0]?.[0] ?? '—';
      done();
    });
    this.svc.getRegionAnalytics().subscribe(d => {
      this.rData = d;
      this.topRegion = Object.entries(d).sort((a,b) => b[1]-a[1])[0]?.[0] ?? '—';
      done();
    });
    this.svc.getTrendAnalytics().subscribe(d => {
      this.tData = d;
      const now = new Date();
      const key = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
      this.currentMonth = d[key] ?? 0;
      done();
    });
  }

  ngAfterViewInit(): void { this.viewOk = true; this.tryDraw(); }

  private tryDraw(): void {
    if (this.loaded < 3 || !this.viewOk) return;
    this.drawBar(); this.drawPie(); this.drawLine();
  }

  private drawBar(): void {
    const e = Object.entries(this.sData).sort((a,b) => b[1]-a[1]);
    new Chart(this.serviceRef.nativeElement, {
      type: 'bar',
      data: {
        labels: e.map(([k]) => k),
        datasets: [{
          label: 'Requests', data: e.map(([,v]) => v),
          backgroundColor: e.map((_,i) => `hsl(${210 + i*15},70%,${55-i*3}%)`),
          borderRadius: 6, borderSkipped: false
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 },
            grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } } } }
    });
  }

  private drawPie(): void {
    const e = Object.entries(this.rData);
    new Chart(this.regionRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: e.map(([k]) => k),
        datasets: [{ data: e.map(([,v]) => v),
          backgroundColor: ['#0066CC','#1B3A6B','#3385D6','#7ea8d8',
            '#0044aa','#4da3ff','#99c4f5'],
          borderWidth: 2, borderColor: '#fff' }]
      },
      options: { responsive: true, cutout: '60%',
        plugins: { legend: { position: 'right',
            labels: { font: { size: 11 }, padding: 16 } } } }
    });
  }

  private drawLine(): void {
    const s = Object.entries(this.tData).sort(([a],[b]) => a.localeCompare(b));
    new Chart(this.trendRef.nativeElement, {
      type: 'line',
      data: {
        labels: s.map(([k]) => k),
        datasets: [{
          label: 'Requests', data: s.map(([,v]) => v),
          borderColor: '#0066CC', backgroundColor: 'rgba(0,102,204,.08)',
          tension: 0.4, fill: true, pointBackgroundColor: '#0066CC',
          pointRadius: 5, pointHoverRadius: 7
        }]
      },
      options: { responsive: true,
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 },
            grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } } },
        plugins: { legend: { display: false } } }
    });
  }

  logout(): void { this.adminService.logout(); }
}
