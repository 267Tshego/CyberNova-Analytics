import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Solutions</p>
        <h1>Cybersecurity Solutions</h1>
        <p>Comprehensive protection tailored for businesses across Southern Africa.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="services-list">
          @for (s of services; track s.title; let i = $index) {
            <div class="service-row" [class.reverse]="i % 2 !== 0">
              <div class="service-text">
                <h2>{{ s.title }}</h2>
                <p>{{ s.description }}</p>
                <ul class="feature-list">
                  @for (f of s.features; track f) {
                    <li>
                      <span class="check">✓</span>{{ f }}
                    </li>
                  }
                </ul>
                <a routerLink="/contact" class="btn-primary">Request This Service</a>
              </div>
              <div class="service-visual">
                <div class="visual-card">
                  <div class="visual-stat">{{ s.stat }}</div>
                  <div class="visual-label">{{ s.statLabel }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Not sure which solution fits your needs?</h2>
          <p>Our security advisors will assess your environment at no charge.</p>
          <a routerLink="/contact" class="btn-primary-lg">Schedule a Free Consultation</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero .section-label { margin-bottom: .5rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; max-width: 560px; }

    .services-list { display: flex; flex-direction: column; gap: 5rem; }
    .service-row { display: grid; grid-template-columns: 1fr 1fr;
      gap: 4rem; align-items: center; }
    .service-row.reverse .service-text  { order: 2; }
    .service-row.reverse .service-visual { order: 1; }

    .service-icon-wrap { font-size: 3rem; margin-bottom: 1rem; }
    .service-text h2 { font-size: 1.75rem; font-weight: 800;
      color: var(--navy-dark); margin-bottom: 1rem; }
    .service-text p  { color: var(--text-muted); line-height: 1.8;
      margin-bottom: 1.5rem; }
    .feature-list { list-style: none; margin-bottom: 2rem;
      display: flex; flex-direction: column; gap: .65rem; }
    .feature-list li { display: flex; align-items: center; gap: .75rem;
      color: var(--text); font-size: .95rem; }
    .check { color: var(--blue); font-weight: 700; }

    .service-visual { display: flex; justify-content: center; }
    .visual-card {
      background: var(--navy-dark); border-radius: var(--radius-lg);
      padding: 3rem; text-align: center; min-width: 260px;
      box-shadow: var(--shadow-lg);
    }
    .visual-icon  { font-size: 4rem; margin-bottom: 1.5rem; }
    .visual-stat  { font-size: 3rem; font-weight: 800; color: #4da3ff; line-height: 1; }
    .visual-label { color: #7ea8d8; font-size: .85rem; margin-top: .5rem;
      text-transform: uppercase; letter-spacing: 1px; }

    .cta-section { background: linear-gradient(135deg, var(--navy) 0%, #0044aa 100%);
      padding: 5rem 0; text-align: center; }
    .cta-content h2 { font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem; }
    .cta-content p  { color: #b0c4de; font-size: 1.05rem; margin-bottom: 2rem; }
    .btn-primary-lg {
      background: white; color: var(--navy); padding: .9rem 2.25rem;
      border-radius: var(--radius); font-weight: 700; font-size: 1rem;
      display: inline-block; transition: transform .2s;
    }
    .btn-primary-lg:hover { transform: translateY(-2px); }

    @media (max-width: 768px) {
      .service-row { grid-template-columns: 1fr; gap: 2rem; }
      .service-row.reverse .service-text { order: 1; }
      .service-row.reverse .service-visual { order: 2; }
    }
  `]
})
export class ServicesPageComponent {
  services = [
    { title: 'AI Cyber Assistant',
      description: 'Our proprietary AI engine monitors your network around the clock, detecting anomalous behaviour using machine learning models trained on regional attack patterns. Threats are explained in plain language so your team can act fast.',
      features: ['Real-time traffic anomaly detection', 'Natural language threat reports',
        'Automated containment recommendations', 'Integration with existing SIEM tools',
        'Mobile alert notifications'],
      stat: '95.7%', statLabel: 'Detection Accuracy' },
    { title: 'Network Security Audit',
      description: 'A thorough evaluation of your entire network infrastructure — from perimeter firewalls to internal access controls. Our certified analysts produce an actionable remediation roadmap.',
      features: ['Full topology and architecture review', 'Firewall rule analysis',
        'Access control and privilege assessment', 'Vulnerability gap analysis',
        'Executive and technical reports'],
      stat: '48hr', statLabel: 'Avg. Audit Completion' },
    { title: 'Penetration Testing',
      description: 'Simulate real-world attacks against your systems to discover exploitable vulnerabilities. Our ethical hackers use the same tools and techniques as threat actors.',
      features: ['External and internal network testing', 'Web and API application testing',
        'Social engineering scenarios', 'Detailed exploit documentation',
        'Free re-test after remediation'],
      stat: '300+', statLabel: 'Tests Completed' },
    { title: 'Managed Security Monitoring',
      description: 'Round-the-clock monitoring from our Security Operations Centre. Your infrastructure is watched by experienced analysts with guaranteed SLA response times.',
      features: ['24/7 SOC coverage', 'Incident response included',
        'Monthly executive reports', 'Dedicated account manager',
        '< 2 minute response SLA'],
      stat: '24/7', statLabel: 'Active Coverage' },
    { title: 'Cyber Awareness Training',
      description: 'Your employees are your greatest vulnerability — and your greatest asset. Our training programmes turn staff into a human firewall through interactive sessions and phishing simulations.',
      features: ['Monthly live webinar sessions', 'Targeted phishing simulations',
        'Certificate of completion', 'Department-specific modules',
        'Customisable for your industry'],
      stat: '89%', statLabel: 'Phishing Resistance Improvement' },
    { title: 'Compliance Advisory',
      description: 'Navigate the complex landscape of data protection regulations with expert guidance. We help you achieve and maintain compliance with POPIA, GDPR, and PCI-DSS.',
      features: ['POPIA compliance gap assessment', 'GDPR advisory for cross-border data',
        'PCI-DSS readiness reviews', 'Policy and procedure drafting',
        'Ongoing compliance monitoring'],
      stat: '100%', statLabel: 'Compliance Rate for Clients' },
  ];
}
