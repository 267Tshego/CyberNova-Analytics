import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="article-wrapper">

      @if (loading) {
        <div class="loading-page">
          <div class="spinner"></div>
          <p>Loading article...</p>
        </div>
      }

      @if (error) {
        <div class="error-page">
          <div class="error-icon">⚠️</div>
          <h2>Article Not Found</h2>
          <p>This article may have been removed or the link is incorrect.</p>
          <a routerLink="/blog" class="btn-primary">Browse All Articles</a>
        </div>
      }

      @if (!loading && !error && post) {
        <!-- Article Header -->
        <div class="article-hero">
          <div class="container">
            <a routerLink="/blog" class="back-link">← Back to Blog</a>
            <div class="article-meta">
              <span class="post-category">Security Intelligence</span>
              <span class="post-date">
                {{ post.createdAt?.seconds * 1000 | date:'MMMM d, yyyy' }}
              </span>
            </div>
            <h1>{{ post.title }}</h1>
            <div class="article-author">
              <div class="author-avatar">{{ post.author?.charAt(0) ?? 'C' }}</div>
              <div>
                <div class="author-name">{{ post.author ?? 'CyberNova Team' }}</div>
                <div class="author-title">Security Researcher</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div class="article-body-wrapper">
          <div class="container">
            <div class="article-layout">
              <article class="article-content">
                @for (paragraph of paragraphs; track $index) {
                  <p>{{ paragraph }}</p>
                }
                <div class="article-end">
                  <p class="end-cta-text">
                    Have security concerns you'd like to discuss with our team?
                  </p>
                  <a routerLink="/contact" class="btn-primary">Contact Our Security Team</a>
                </div>
              </article>

              <aside class="article-sidebar">
                <div class="sidebar-card">
                  <h4>Get Expert Help</h4>
                  <p>Our security team is ready to assist with your cybersecurity challenges.</p>
                  <a routerLink="/contact" class="btn-primary sidebar-btn">Request Assessment</a>
                </div>
                <div class="sidebar-card topics">
                  <h4>Related Topics</h4>
                  @for (topic of topics; track topic) {
                    <span class="topic-tag">{{ topic }}</span>
                  }
                </div>
              </aside>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .loading-page, .error-page {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; min-height: 60vh; gap: 1rem; text-align: center;
      padding: 2rem;
    }
    .spinner { width: 48px; height: 48px; border: 3px solid var(--border);
      border-top-color: var(--blue); border-radius: 50%;
      animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .error-icon { font-size: 3.5rem; }
    .error-page h2 { font-size: 1.75rem; color: var(--navy-dark); }
    .error-page p  { color: var(--text-muted); margin-bottom: 1rem; }

    .article-hero {
      background: var(--navy-dark); color: white; padding: 4rem 0 3rem;
    }
    .back-link { color: #7ea8d8; font-size: .88rem; font-weight: 600;
      display: inline-flex; align-items: center; gap: .5rem;
      margin-bottom: 1.5rem; transition: color .2s; }
    .back-link:hover { color: white; }
    .article-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .post-category { background: rgba(0,102,204,.3); color: #7ea8d8;
      font-size: .72rem; font-weight: 700; padding: .25rem .75rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: .5px; }
    .post-date { color: #94a3b8; font-size: .85rem; }
    .article-hero h1 {
      font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800;
      line-height: 1.2; margin-bottom: 1.5rem; max-width: 820px;
    }
    .article-author { display: flex; align-items: center; gap: .75rem; }
    .author-avatar { width: 44px; height: 44px; border-radius: 50%;
      background: var(--blue); color: white; font-weight: 700;
      display: flex; align-items: center; justify-content: center; }
    .author-name  { font-weight: 700; color: white; font-size: .9rem; }
    .author-title { color: #94a3b8; font-size: .8rem; }

    .article-body-wrapper { background: var(--bg); padding: 4rem 0; }
    .article-layout { display: grid; grid-template-columns: 1fr 300px; gap: 3rem; }

    .article-content p {
      color: var(--text); line-height: 1.9; font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }
    .article-end {
      margin-top: 3rem; padding: 2rem; background: var(--blue-light);
      border-radius: var(--radius-lg); border: 1px solid #c3d9f0;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 1rem;
    }
    .end-cta-text { font-weight: 600; color: var(--navy-dark); margin: 0; }

    .article-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
    .sidebar-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
    .sidebar-card h4 { font-size: 1rem; font-weight: 700; color: var(--navy-dark);
      margin-bottom: .75rem; }
    .sidebar-card p  { font-size: .88rem; color: var(--text-muted); line-height: 1.6;
      margin-bottom: 1rem; }
    .sidebar-btn { width: 100%; text-align: center; display: block; padding: .7rem; }
    .topics { display: flex; flex-wrap: wrap; gap: .5rem; }
    .topics h4 { width: 100%; }
    .topic-tag { background: var(--bg); border: 1px solid var(--border);
      padding: .3rem .8rem; border-radius: 20px; font-size: .78rem;
      font-weight: 600; color: var(--text-muted); cursor: default;
      transition: all .2s; }
    .topic-tag:hover { border-color: var(--blue); color: var(--blue); }

    @media (max-width: 900px) {
      .article-layout { grid-template-columns: 1fr; }
      .article-sidebar { order: -1; }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  post: any       = null;
  paragraphs: string[] = [];
  loading = true;
  error   = false;
  topics  = ['Ransomware', 'Network Security', 'Threat Intelligence',
    'POPIA Compliance', 'Phishing', 'Zero-Day Exploits'];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.error = true; this.loading = false; return; }
    this.http.get<any>(`${environment.contentApi}/blog/${id}`).subscribe({
      next: post => {
        this.post = post;
        this.paragraphs = (post.content as string)
          .split('\n').map((p: string) => p.trim()).filter((p: string) => p.length > 0);
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}
