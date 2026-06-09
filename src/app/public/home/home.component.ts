import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- ── HERO ──────────────────────────────────────────────── -->
    <section class="hero">
      <canvas #networkCanvas class="network-canvas"></canvas>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">AI-Powered Cybersecurity</div>
        <h1>Defend. Detect.<br><span class="accent">Respond.</span></h1>
        <p>CyberNova Analytics delivers intelligent, real-time cybersecurity protection
          for businesses across Southern Africa — powered by AI and built for scale.</p>
        <div class="hero-actions">
          <a routerLink="/contact" class="btn-primary-lg">Request a Free Assessment</a>
          <a routerLink="/services" class="btn-ghost">Explore Solutions →</a>
        </div>
        <div class="hero-stats">
          @for (s of stats; track s.label) {
            <div class="stat">
              <span class="stat-value">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── TRUSTED BY ─────────────────────────────────────────── -->
    <section class="trusted">
      <div class="container">
        <p class="trusted-label">Trusted by organisations across the SADC region</p>
        <div class="trusted-logos">
          @for (org of orgs; track org) {
            <div class="org-pill">{{ org }}</div>
          }
        </div>
      </div>
    </section>

    <!-- ── SOLUTIONS ──────────────────────────────────────────── -->
    <section class="section solutions-section">
      <div class="container">
        <div class="section-header">
          <p class="section-label">What We Do</p>
          <h2 class="section-title">Comprehensive Security Solutions</h2>
          <p class="section-subtitle">
            From real-time threat monitoring to full penetration testing — we provide
            end-to-end protection tailored to your environment.
          </p>
        </div>
        <div class="solutions-grid">
          @for (s of solutions; track s.title) {
            <div class="solution-card">
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
              <a routerLink="/services" class="card-link">Learn more →</a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── WHY CYBERNOVA ──────────────────────────────────────── -->
    <section class="section why-section">
      <div class="container">
        <div class="why-grid">
          <div class="why-content">
            <p class="section-label">Why CyberNova</p>
            <h2 class="section-title">Security Intelligence<br>Built for Africa</h2>
            <p class="why-desc">
              We combine AI threat intelligence with deep local knowledge of the Southern
              African threat landscape — delivering protection that global vendors simply
              cannot match.
            </p>
            <div class="why-points">
              @for (p of points; track p.title) {
                <div class="why-point">
                  <div>
                    <h4>{{ p.title }}</h4>
                    <p>{{ p.desc }}</p>
                  </div>
                </div>
              }
            </div>
            <a routerLink="/contact" class="btn-primary">Talk to an Expert</a>
          </div>
          <div class="why-visual">
            <div class="threat-dashboard">
              <div class="dash-header">
                <span class="dash-dot red"></span>
                <span class="dash-dot yellow"></span>
                <span class="dash-dot green"></span>
                <span class="dash-title">Threat Intelligence Feed</span>
              </div>
              <div class="threat-items">
                @for (t of threats; track t.type) {
                  <div class="threat-item" [class]="t.level">
                    <div class="threat-left">
                      <span class="threat-indicator"></span>
                      <span class="threat-type">{{ t.type }}</span>
                    </div>
                    <span class="threat-badge">{{ t.level }}</span>
                  </div>
                }
              </div>
              <div class="dash-footer">
                <span class="pulse-dot"></span>
                Live monitoring active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA BANNER ─────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Strengthen Your Security Posture?</h2>
          <p>Get a no-obligation cybersecurity assessment from our expert team.</p>
          <a routerLink="/contact" class="btn-primary-lg">Request Free Assessment</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ── HERO ── */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center;
      background: var(--navy-dark); overflow: hidden;
    }
    .network-canvas {
      position: absolute; inset: 0; width: 100%; height: 100%;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(135deg,
        rgba(15,29,51,.92) 0%,
        rgba(15,29,51,.75) 60%,
        rgba(0,60,120,.5) 100%);
    }
    .hero-content {
      position: relative; z-index: 2;
      max-width: 1280px; margin: 0 auto; padding: 0 2rem;
      padding-top: 4rem;
    }
    .hero-badge {
      display: inline-block; background: rgba(0,102,204,.25);
      border: 1px solid rgba(0,102,204,.5);
      color: #7ea8d8; font-size: .8rem; font-weight: 600;
      letter-spacing: 1.5px; text-transform: uppercase;
      padding: .4rem 1rem; border-radius: 20px; margin-bottom: 1.5rem;
    }
    .hero-content h1 {
      font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 800;
      color: white; line-height: 1.05; margin-bottom: 1.5rem;
    }
    .accent { color: #4da3ff; }
    .hero-content p {
      font-size: 1.2rem; color: #b0c4de; max-width: 580px;
      line-height: 1.7; margin-bottom: 2.5rem;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 4rem; }
    .btn-primary-lg {
      background: var(--blue); color: white; padding: .9rem 2.25rem;
      border-radius: var(--radius); font-weight: 700; font-size: 1rem;
      border: none; cursor: pointer; transition: background .2s, transform .1s;
      display: inline-block;
    }
    .btn-primary-lg:hover { background: #0052a3; transform: translateY(-2px); }
    .btn-ghost {
      color: #b0c4de; font-size: 1rem; font-weight: 600;
      padding: .9rem 0; transition: color .2s; display: inline-block;
    }
    .btn-ghost:hover { color: white; }
    .hero-stats { display: flex; gap: 3rem; flex-wrap: wrap; }
    .stat { display: flex; flex-direction: column; }
    .stat-value { font-size: 2.25rem; font-weight: 800; color: white; line-height: 1; }
    .stat-label { font-size: .8rem; color: #7ea8d8; margin-top: .25rem;
      text-transform: uppercase; letter-spacing: 1px; }

    /* ── TRUSTED ── */
    .trusted { background: white; padding: 1.75rem 0;
      border-bottom: 1px solid var(--border); }
    .trusted-label { font-size: .8rem; color: var(--text-muted); font-weight: 500;
      text-transform: uppercase; letter-spacing: 1px;
      margin-bottom: 1rem; text-align: center; }
    .trusted-logos { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
    .org-pill { background: var(--bg); border: 1px solid var(--border);
      padding: .4rem 1.1rem; border-radius: 20px;
      font-size: .82rem; font-weight: 600; color: var(--text-muted); }

    /* ── SOLUTIONS ── */
    .solutions-section { background: var(--bg); }
    .section-header { text-align: center; margin-bottom: 3.5rem; }
    .section-header .section-subtitle { margin: 0 auto; }
    .solutions-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
      gap: 1.5rem;
    }
    .solution-card {
      background: white; padding: 2rem; border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
      transition: box-shadow .2s, transform .2s;
      display: flex; flex-direction: column; gap: .75rem;
    }
    .solution-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .solution-icon { font-size: 2.25rem; }
    .solution-card h3 { font-size: 1.05rem; font-weight: 700; color: var(--navy-dark); }
    .solution-card p  { color: var(--text-muted); font-size: .9rem; line-height: 1.6;
      flex: 1; }
    .card-link { color: var(--blue); font-size: .88rem; font-weight: 600;
      transition: gap .2s; }
    .card-link:hover { color: #0052a3; }

    /* ── WHY ── */
    .why-section { background: white; }
    .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
    .why-desc { color: var(--text-muted); line-height: 1.8;
      margin-bottom: 2rem; font-size: 1.02rem; }
    .why-points { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; }
    .why-point { display: flex; gap: 1rem; align-items: flex-start; }
    .point-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: .1rem; }
    .why-point h4 { font-size: .95rem; font-weight: 700; color: var(--navy-dark);
      margin-bottom: .25rem; }
    .why-point p  { font-size: .88rem; color: var(--text-muted); line-height: 1.6; }

    /* Threat Dashboard Widget */
    .threat-dashboard {
      background: #0d1b2e; border-radius: var(--radius-lg);
      overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.3);
    }
    .dash-header {
      padding: .85rem 1.25rem; background: #162032;
      display: flex; align-items: center; gap: .5rem;
      border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .dash-dot { width: 10px; height: 10px; border-radius: 50%; }
    .dash-dot.red    { background: #ff5f57; }
    .dash-dot.yellow { background: #ffbd2e; }
    .dash-dot.green  { background: #28c840; }
    .dash-title { font-size: .8rem; color: #7ea8d8; margin-left: .5rem;
      font-weight: 600; letter-spacing: .5px; }
    .threat-items { padding: 1rem; display: flex; flex-direction: column; gap: .6rem; }
    .threat-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: .75rem 1rem; border-radius: var(--radius);
      background: rgba(255,255,255,.04);
    }
    .threat-left { display: flex; align-items: center; gap: .75rem; }
    .threat-indicator { width: 8px; height: 8px; border-radius: 50%; }
    .threat-item.critical .threat-indicator { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
    .threat-item.high     .threat-indicator { background: #f97316; box-shadow: 0 0 6px #f97316; }
    .threat-item.medium   .threat-indicator { background: #eab308; box-shadow: 0 0 6px #eab308; }
    .threat-item.low      .threat-indicator { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
    .threat-type { color: #c8d8ed; font-size: .85rem; font-weight: 500; }
    .threat-badge { font-size: .72rem; font-weight: 700; padding: .2rem .65rem;
      border-radius: 12px; text-transform: uppercase; letter-spacing: .5px; }
    .threat-item.critical .threat-badge { background: rgba(239,68,68,.15); color: #f87171; }
    .threat-item.high     .threat-badge { background: rgba(249,115,22,.15); color: #fb923c; }
    .threat-item.medium   .threat-badge { background: rgba(234,179,8,.15);  color: #fbbf24; }
    .threat-item.low      .threat-badge { background: rgba(34,197,94,.15);  color: #4ade80; }
    .dash-footer { padding: 1rem 1.25rem; border-top: 1px solid rgba(255,255,255,.06);
      display: flex; align-items: center; gap: .6rem;
      font-size: .78rem; color: #7ea8d8; }
    .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
      animation: pulse 1.5s infinite; }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: .6; transform: scale(1.3); }
    }

    /* ── CTA ── */
    .cta-section {
      background: linear-gradient(135deg, var(--navy) 0%, #0044aa 100%);
      padding: 5rem 0; text-align: center;
    }
    .cta-content h2 { font-size: 2.2rem; font-weight: 800; color: white;
      margin-bottom: 1rem; }
    .cta-content p  { color: #b0c4de; font-size: 1.1rem; margin-bottom: 2rem; }

    @media (max-width: 900px) {
      .why-grid { grid-template-columns: 1fr; }
      .why-visual { order: -1; }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('networkCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private animFrame!: number;

  stats = [
    { value: '500+', label: 'Clients Protected' },
    { value: '95.7%', label: 'Threat Detection Rate' },
    { value: '< 2min', label: 'Avg Response Time' },
    { value: '24/7', label: 'Active Monitoring' },
  ];

  orgs = ['Ministry of Finance', 'First National Bank', 'BTC Botswana',
    'SADC Secretariat', 'Stanbic Bank', 'BURS', 'Debswana'];

  solutions = [
    { title: 'AI Cyber Assistant',
      desc: 'Real-time threat detection powered by machine learning, with plain-language risk explanations.' },
    { title: 'Network Security Audit',
      desc: 'Comprehensive review of infrastructure, firewall rules, and security policies.' },
    { title: 'Penetration Testing',
      desc: 'Authorised ethical hacking to uncover vulnerabilities before attackers do.' },
    { title: 'Managed Monitoring',
      desc: '24/7 Security Operations Centre with guaranteed response times and SLA.' },
    { title: 'Cyber Awareness Training',
      desc: 'Staff training through live webinars and phishing simulation exercises.' },
    { title: 'Compliance Advisory',
      desc: 'Alignment with POPIA, GDPR and regional data protection regulations.' },
  ];

  points = [
    { title: 'Local Expertise',
      desc: 'Deep knowledge of the Southern African threat landscape and regulatory environment.' },
    { title: 'Rapid Response',
      desc: 'Average incident response time under 2 minutes with our 24/7 SOC team.' },
    { title: 'AI-First Approach',
      desc: 'Proprietary AI engine trained on regional attack patterns and threat intelligence.' },
  ];

  threats = [
    { type: 'Ransomware Signature Detected', level: 'critical' },
    { type: 'Suspicious Outbound Traffic',   level: 'high' },
    { type: 'Failed Authentication Spike',   level: 'medium' },
    { type: 'Software Update Available',     level: 'low' },
    { type: 'Phishing URL Blocked',          level: 'high' },
    { type: 'Port Scan Detected',            level: 'medium' },
  ];

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Node setup
    const NODE_COUNT = 60;
    const MAX_DIST   = 160;

    interface Node { x: number; y: number; vx: number; vy: number; r: number; }
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r:  Math.random() * 2 + 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * .35;
            ctx.strokeStyle = `rgba(0, 140, 255, ${alpha})`;
            ctx.lineWidth = .8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 180, 255, 0.7)';
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
        grad.addColorStop(0, 'rgba(0, 140, 255, 0.15)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
      });

      this.animFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
  }
}
