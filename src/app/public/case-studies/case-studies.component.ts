import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Results</p>
        <h1>Case Studies</h1>
        <p>Real-world threat mitigation outcomes for clients across Southern Africa.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading) {
          <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading case studies...</p>
          </div>
        }

        @if (!loading && caseStudies.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">📁</div>
            <h3>Case studies coming soon</h3>
            <p>Our team is documenting recent engagements. Check back shortly.</p>
          </div>
        }

        @if (!loading && caseStudies.length > 0) {
          <div class="cs-grid">
            @for (cs of caseStudies; track cs.id; let i = $index) {
              <div class="cs-card">
                <div class="cs-number">#{{ (i + 1).toString().padStart(2, '0') }}</div>
                <div class="cs-body">
                  <h2>{{ cs.title }}</h2>
                  <div class="cs-section">
                    <div class="cs-section-label">
                      <span class="dot blue"></span>The Challenge
                    </div>
                    <p>{{ cs.description }}</p>
                  </div>
                  <div class="cs-section outcome">
                    <div class="cs-section-label">
                      <span class="dot green"></span>The Outcome
                    </div>
                    <p>{{ cs.outcome }}</p>
                  </div>
                  @if (cs.createdAt) {
                    <div class="cs-meta">
                      {{ cs.createdAt?.seconds * 1000 | date:'MMMM yyyy' }}
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Want results like these?</h2>
          <p>Contact our team to discuss how we can protect your organisation.</p>
          <a href="/contact" class="btn-white">Get in Touch</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; }

    .loading-state { display: flex; flex-direction: column; align-items: center;
      gap: 1rem; padding: 6rem 0; color: var(--text-muted); }
    .spinner { width: 40px; height: 40px; border: 3px solid var(--border);
      border-top-color: var(--blue); border-radius: 50%;
      animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .empty-state { text-align: center; padding: 6rem 0; }
    .empty-icon  { font-size: 4rem; margin-bottom: 1rem; }
    .empty-state h3 { font-size: 1.5rem; color: var(--navy-dark); margin-bottom: .5rem; }
    .empty-state p  { color: var(--text-muted); }

    .cs-grid { display: flex; flex-direction: column; gap: 2rem; }

    .cs-card {
      background: white; border-radius: var(--radius-lg); padding: 2.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
      display: grid; grid-template-columns: 80px 1fr; gap: 2rem;
      transition: box-shadow .2s, transform .2s;
    }
    .cs-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }

    .cs-number {
      font-size: 2rem; font-weight: 800; color: var(--border);
      font-variant-numeric: tabular-nums; padding-top: .25rem;
    }

    .cs-body h2 { font-size: 1.35rem; font-weight: 800; color: var(--navy-dark);
      margin-bottom: 1.5rem; line-height: 1.3; }

    .cs-section { margin-bottom: 1.25rem; }
    .cs-section-label { display: flex; align-items: center; gap: .5rem;
      font-size: .78rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; color: var(--text-muted); margin-bottom: .6rem; }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot.blue  { background: var(--blue); }
    .dot.green { background: #22c55e; }
    .cs-section p { color: var(--text); line-height: 1.7; }

    .cs-section.outcome { background: #f0fdf4; border-radius: var(--radius);
      padding: 1rem 1.25rem; }
    .cs-section.outcome p { color: #166534; }
    .cs-section.outcome .cs-section-label { color: #166534; }

    .cs-meta { margin-top: 1rem; font-size: .82rem; color: var(--text-muted);
      font-weight: 500; }

    .cta-section { background: linear-gradient(135deg, var(--navy) 0%, #0044aa 100%);
      padding: 5rem 0; text-align: center; }
    .cta-content h2 { font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem; }
    .cta-content p  { color: #b0c4de; margin-bottom: 2rem; }
    .btn-white { background: white; color: var(--navy); padding: .9rem 2.25rem;
      border-radius: var(--radius); font-weight: 700; display: inline-block;
      transition: transform .2s; }
    .btn-white:hover { transform: translateY(-2px); }

    @media (max-width: 600px) {
      .cs-card { grid-template-columns: 1fr; gap: .5rem; }
      .cs-number { font-size: 1.5rem; }
    }
  `]
})
export class CaseStudiesComponent implements OnInit {
  caseStudies: any[] = [];
  loading = true;
  constructor(private contentService: ContentService) {}
  ngOnInit(): void {
    this.contentService.getCaseStudies().subscribe({
      next: d => { this.caseStudies = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
