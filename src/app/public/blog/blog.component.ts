import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, SlicePipe],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Insights</p>
        <h1>Security Blog</h1>
        <p>Expert analysis on cybersecurity threats, trends and best practices.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading) {
          <div class="loading-grid">
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="skeleton-card">
                <div class="sk-header"></div>
                <div class="sk-line"></div>
                <div class="sk-line short"></div>
              </div>
            }
          </div>
        }

        @if (!loading && posts.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>No articles yet</h3>
            <p>Check back soon for expert cybersecurity insights.</p>
          </div>
        }

        @if (!loading && posts.length > 0) {
          <div class="blog-layout">
            <!-- Featured first post -->
            <div class="featured-post">
              <div class="featured-tag">Featured</div>
              <div class="post-meta">
                <span class="post-category">Threat Intelligence</span>
                <span class="post-date">
                  {{ posts[0].createdAt?.seconds * 1000 | date:'MMMM d, yyyy' }}
                </span>
              </div>
              <h2>{{ posts[0].title }}</h2>
              <p>{{ posts[0].content | slice:0:240 }}...</p>
              <div class="post-footer">
                <div class="author-info">
                  <div class="author-avatar">{{ posts[0].author?.charAt(0) ?? 'C' }}</div>
                  <span>{{ posts[0].author ?? 'CyberNova Team' }}</span>
                </div>
                <a [routerLink]="['/blog', posts[0].id]" class="btn-primary">Read Article</a>
              </div>
            </div>

            <!-- Remaining posts grid -->
            @if (posts.length > 1) {
              <div class="posts-grid">
                @for (post of posts.slice(1); track post.id) {
                  <a [routerLink]="['/blog', post.id]" class="post-card">
                    <div class="post-card-body">
                      <div class="post-meta">
                        <span class="post-category">Security</span>
                        <span class="post-date">
                          {{ post.createdAt?.seconds * 1000 | date:'MMM d, yyyy' }}
                        </span>
                      </div>
                      <h3>{{ post.title }}</h3>
                      <p>{{ post.content | slice:0:120 }}...</p>
                    </div>
                    <div class="post-card-footer">
                      <div class="author-info small">
                        <div class="author-avatar sm">{{ post.author?.charAt(0) ?? 'C' }}</div>
                        <span>{{ post.author ?? 'CyberNova Team' }}</span>
                      </div>
                      <span class="read-more">Read →</span>
                    </div>
                  </a>
                }
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; }

    /* Loading skeletons */
    .loading-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
    .skeleton-card { background: white; border-radius: var(--radius-lg); padding: 1.5rem;
      border: 1px solid var(--border); }
    .sk-header { height: 180px; background: #e2e8f0; border-radius: var(--radius);
      margin-bottom: 1rem; animation: shimmer 1.5s infinite; }
    .sk-line   { height: 14px; background: #e2e8f0; border-radius: 4px;
      margin-bottom: .75rem; animation: shimmer 1.5s infinite; }
    .sk-line.short { width: 60%; }
    @keyframes shimmer {
      0%, 100% { opacity: 1; } 50% { opacity: .5; }
    }

    /* Empty */
    .empty-state { text-align: center; padding: 6rem 0; }
    .empty-icon  { font-size: 4rem; margin-bottom: 1rem; }
    .empty-state h3 { font-size: 1.5rem; color: var(--navy-dark); margin-bottom: .5rem; }
    .empty-state p  { color: var(--text-muted); }

    /* Blog layout */
    .blog-layout { display: flex; flex-direction: column; gap: 3rem; }

    .featured-post {
      background: white; border-radius: var(--radius-lg); padding: 2.5rem;
      box-shadow: var(--shadow-md); border: 1px solid var(--border);
      position: relative;
    }
    .featured-tag {
      position: absolute; top: 1.5rem; right: 1.5rem;
      background: var(--blue); color: white;
      font-size: .72rem; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; padding: .3rem .8rem; border-radius: 20px;
    }
    .post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .post-category { background: var(--blue-light); color: var(--blue);
      font-size: .75rem; font-weight: 700; padding: .25rem .75rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: .5px; }
    .post-date { color: var(--text-muted); font-size: .85rem; }
    .featured-post h2 { font-size: 1.75rem; font-weight: 800; color: var(--navy-dark);
      margin-bottom: 1rem; line-height: 1.3; }
    .featured-post > p { color: var(--text-muted); line-height: 1.7;
      margin-bottom: 1.5rem; font-size: 1.02rem; }
    .post-footer { display: flex; justify-content: space-between; align-items: center; }
    .author-info { display: flex; align-items: center; gap: .75rem; }
    .author-info span { font-size: .9rem; font-weight: 500; color: var(--text-muted); }
    .author-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: var(--navy); color: white;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .9rem;
    }
    .author-avatar.sm { width: 28px; height: 28px; font-size: .75rem; }

    .posts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
      gap: 1.5rem; }
    .post-card {
      background: white; border-radius: var(--radius-lg); border: 1px solid var(--border);
      overflow: hidden; transition: box-shadow .2s, transform .2s;
      display: flex; flex-direction: column;
    }
    .post-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .post-card-body { padding: 1.5rem; flex: 1; }
    .post-card-body h3 { font-size: 1.05rem; font-weight: 700; color: var(--navy-dark);
      margin-bottom: .75rem; line-height: 1.4; }
    .post-card-body p  { color: var(--text-muted); font-size: .88rem; line-height: 1.6; }
    .post-card-footer {
      padding: 1rem 1.5rem; border-top: 1px solid var(--border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .author-info.small span { font-size: .82rem; }
    .read-more { color: var(--blue); font-size: .85rem; font-weight: 600; }
  `]
})
export class BlogComponent implements OnInit {
  posts: any[] = [];
  loading = true;
  constructor(private cs: ContentService) {}
  ngOnInit() {
    this.cs.getBlogPosts().subscribe({
      next: p => { this.posts = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
