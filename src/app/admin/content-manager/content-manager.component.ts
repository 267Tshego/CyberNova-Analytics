import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../core/services/admin.service';
import {NgOptimizedImage} from '@angular/common';

type Tab = 'blog' | 'caseStudy' | 'gallery' | 'testimonials';

@Component({
  selector: 'app-content-manager',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, NgOptimizedImage],
  template: `
    <div class="admin-shell">
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

      <div class="admin-main">
        <div class="admin-topbar">
          <div>
            <h1 class="page-title">Content Manager</h1>
            <p class="page-subtitle">
              Publish blog posts, case studies, gallery images and approve testimonials
            </p>
          </div>
        </div>

        <div class="tab-row">
          <button [class.active]="tab==='blog'" (click)="setTab('blog')">Blog Post</button>
          <button [class.active]="tab==='caseStudy'" (click)="setTab('caseStudy')">Case Study</button>
          <button [class.active]="tab==='gallery'" (click)="setTab('gallery')">Gallery</button>
          <button [class.active]="tab==='testimonials'" (click)="setTab('testimonials')">Testimonials</button>
        </div>

        @if (toastMsg) {
          <div class="toast success">{{ toastMsg }}</div>
        }

        @if (errMsg) {
          <div class="toast error">{{ errMsg }}</div>
        }

        <!-- BLOG -->
        @if (tab === 'blog') {
          <div class="form-card">
            <h2>Publish Blog Post</h2>

            <form [formGroup]="blogForm" (ngSubmit)="publishBlog()">
              <div class="form-group">
                <label>Title <span class="req">*</span></label>
                <input formControlName="title" placeholder="e.g. Top Cyber Threats in 2025">
                @if (bi('title')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-group">
                <label>Author</label>
                <input formControlName="author" placeholder="Author name">
              </div>

              <div class="form-group">
                <label>Content <span class="req">*</span></label>
                <textarea
                  formControlName="content"
                  rows="14"
                  placeholder="Write your article here. Each new line becomes a paragraph on the website.">
                </textarea>
                @if (bi('content')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="btn-ghost-sm"
                  (click)="blogForm.reset({author:'CyberNova Team'})">
                  Clear
                </button>

                <button
                  type="submit"
                  class="btn-primary-sm"
                  [disabled]="blogForm.invalid || saving">
                  {{ saving ? 'Publishing...' : 'Publish Post' }}
                </button>
              </div>
            </form>
          </div>
        }

        <!-- CASE STUDY -->
        @if (tab === 'caseStudy') {
          <div class="form-card">
            <h2>Publish Case Study</h2>

            <form [formGroup]="csForm" (ngSubmit)="publishCS()">
              <div class="form-group">
                <label>Title <span class="req">*</span></label>
                <input formControlName="title" placeholder="e.g. Ransomware Prevention at a Botswana Bank">
                @if (ci('title')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-group">
                <label>Challenge / Description <span class="req">*</span></label>
                <textarea
                  formControlName="description"
                  rows="5"
                  placeholder="Describe the security challenge the client faced...">
                </textarea>
                @if (ci('description')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-group">
                <label>Outcome <span class="req">*</span></label>
                <textarea
                  formControlName="outcome"
                  rows="4"
                  placeholder="Describe the measurable result achieved...">
                </textarea>
                @if (ci('outcome')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-actions">
                <button type="button" class="btn-ghost-sm" (click)="csForm.reset()">Clear</button>

                <button
                  type="submit"
                  class="btn-primary-sm"
                  [disabled]="csForm.invalid || saving">
                  {{ saving ? 'Publishing...' : 'Publish Case Study' }}
                </button>
              </div>
            </form>
          </div>
        }

        <!-- GALLERY -->
        @if (tab === 'gallery') {
          <div class="form-card">
            <h2>Add Gallery Image</h2>

            <form [formGroup]="galleryForm" (ngSubmit)="addImage()">
              <div class="form-group">
                <label>Image URL <span class="req">*</span></label>
                <input formControlName="url" placeholder="https://example.com/image.jpg">
                @if (gi('url')) {
                  <span class="ferr">Required</span>
                }
              </div>

              @if (galleryForm.get('url')?.value) {
                <div class="img-preview">
                  <img
                    [src]="galleryForm.get('url')?.value"
                    alt="Preview"
                    (error)="$any($event.target).style.display='none'">
                </div>
              }

              <div class="form-group">
                <label>Filename <span class="req">*</span></label>
                <input formControlName="filename" placeholder="e.g. workshop-gaborone-2025.jpg">
                @if (gi('filename')) {
                  <span class="ferr">Required</span>
                }
              </div>

              <div class="form-group">
                <label>Caption</label>
                <input formControlName="caption" placeholder="Short description of the image">
              </div>

              <div class="form-actions">
                <button type="button" class="btn-ghost-sm" (click)="galleryForm.reset()">Clear</button>

                <button
                  type="submit"
                  class="btn-primary-sm"
                  [disabled]="galleryForm.invalid || saving">
                  {{ saving ? 'Adding...' : 'Add to Gallery' }}
                </button>
              </div>
            </form>
          </div>
        }

        <!-- TESTIMONIALS -->
        @if (tab === 'testimonials') {
          <div class="form-card">
            <h2>Pending Testimonial Approvals</h2>

            @if (loadingT) {
              <div class="t-loading">
                <div class="spinner"></div>
                Loading pending testimonials...
              </div>
            }

            @if (!loadingT && pending.length === 0) {
              <div class="t-empty">
                <span>✅</span>
                <p>All testimonials have been reviewed. Nothing pending.</p>
              </div>
            }

            @if (!loadingT && pending.length > 0) {
              <div class="t-list">
                @for (t of pending; track t.id) {
                  <div class="t-card">
                    <div class="t-head">
                      <div class="t-author">
                        <div class="t-avatar">
                          {{ getTestimonialName(t).charAt(0) }}
                        </div>

                        <div>
                          <div class="t-name">{{ getTestimonialName(t) }}</div>

                          @if (t.company) {
                            <div class="t-company">{{ t.company }}</div>
                          }
                        </div>
                      </div>

                      <div class="t-stars">
                        @for (s of getStars(t.rating); track $index) {
                          <span [class.filled]="s">★</span>
                        }
                      </div>
                    </div>

                    <p class="t-text">"{{ getTestimonialMessage(t) }}"</p>

                    <div class="t-footer">
                      <button class="approve-btn" (click)="approve(t.id)">
                        ✓ Approve
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-shell { display: flex; min-height: 100vh; background: #f1f5f9; }

    .sidebar {
      width: 256px;
      background: var(--navy-dark);
      color: white;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .sidebar-brand {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: .75rem;
      border-bottom: 1px solid rgba(255,255,255,.06);
    }

    .sidebar-logo {
      height: 38px;
      filter: brightness(0) invert(1);
    }

    .sb-name {
      display: block;
      font-size: .8rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: white;
    }

    .sb-sub {
      display: block;
      font-size: .65rem;
      color: #7ea8d8;
      letter-spacing: .5px;
    }

    .sidebar-nav {
      padding: 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: .15rem;
    }

    .nav-section-label {
      font-size: .68rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #4a6380;
      padding: 1rem .75rem .4rem;
    }

    .sidebar-nav a,
    .nav-logout,
    .nav-view-site {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding: .7rem .9rem;
      border-radius: var(--radius);
      color: #94a3b8;
      font-size: .88rem;
      font-weight: 500;
      transition: all .2s;
      cursor: pointer;
      text-decoration: none;
      background: none;
      border: none;
      width: 100%;
      text-align: left;
    }

    .sidebar-nav a:hover,
    .nav-logout:hover,
    .nav-view-site:hover {
      background: rgba(255,255,255,.06);
      color: white;
    }

    .sidebar-nav a.active {
      background: rgba(0,102,204,.25);
      color: #60a5fa;
    }

    .nav-icon { font-size: 1rem; }

    .nav-logout {
      color: #f87171;
      margin-top: auto;
    }

    .admin-main {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
    }

    .admin-topbar { margin-bottom: 2rem; }

    .page-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--navy-dark);
    }

    .page-subtitle {
      color: var(--text-muted);
      font-size: .9rem;
      margin-top: .25rem;
    }

    .tab-row {
      display: flex;
      gap: .5rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .tab-row button {
      padding: .6rem 1.25rem;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      background: white;
      font-size: .88rem;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      font-family: inherit;
      transition: all .2s;
    }

    .tab-row button:hover {
      border-color: var(--blue);
      color: var(--blue);
    }

    .tab-row button.active {
      background: var(--navy-dark);
      color: white;
      border-color: var(--navy-dark);
    }

    .toast {
      padding: .9rem 1.25rem;
      border-radius: var(--radius);
      margin-bottom: 1.5rem;
      font-weight: 600;
      font-size: .9rem;
      display: flex;
      align-items: center;
      gap: .75rem;
    }

    .toast.success {
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    .toast.error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .form-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border);
    }

    .form-card h2 {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--navy-dark);
      margin-bottom: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: .45rem;
      margin-bottom: 1.25rem;
    }

    .form-group label {
      font-weight: 600;
      font-size: .875rem;
      color: var(--text);
    }

    .req { color: #ef4444; }

    .ferr {
      font-size: .78rem;
      color: #ef4444;
      font-weight: 500;
    }

    input,
    textarea {
      padding: .75rem 1rem;
      border: 2px solid var(--border);
      border-radius: var(--radius);
      font-size: .95rem;
      font-family: inherit;
      outline: none;
      transition: border-color .2s;
      background: var(--bg);
    }

    input:focus,
    textarea:focus {
      border-color: var(--blue);
      background: white;
    }

    .img-preview {
      margin-bottom: 1.25rem;
      border-radius: var(--radius);
      overflow: hidden;
      border: 2px solid var(--border);
      max-height: 200px;
    }

    .img-preview img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding-top: .5rem;
    }

    .btn-primary-sm {
      background: var(--navy-dark);
      color: white;
      border: none;
      padding: .7rem 2rem;
      border-radius: var(--radius);
      font-size: .9rem;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }

    .btn-primary-sm:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    .btn-ghost-sm {
      background: var(--bg);
      color: var(--text-muted);
      border: 2px solid var(--border);
      padding: .65rem 1.5rem;
      border-radius: var(--radius);
      font-size: .88rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }

    .t-loading {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: var(--text-muted);
      padding: 3rem;
      justify-content: center;
    }

    .spinner {
      width: 28px;
      height: 28px;
      border: 3px solid var(--border);
      border-top-color: var(--blue);
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .t-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .75rem;
      padding: 4rem;
      color: var(--text-muted);
      text-align: center;
    }

    .t-empty span { font-size: 2.5rem; }

    .t-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .t-card {
      border: 2px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: border-color .2s;
    }

    .t-card:hover { border-color: var(--blue); }

    .t-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .t-author {
      display: flex;
      align-items: center;
      gap: .75rem;
    }

    .t-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--navy);
      color: white;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .9rem;
      flex-shrink: 0;
    }

    .t-name {
      font-weight: 700;
      font-size: .9rem;
      color: var(--navy-dark);
    }

    .t-company {
      font-size: .78rem;
      color: var(--text-muted);
    }

    .t-stars span {
      font-size: 1.1rem;
      color: #d1d5db;
    }

    .t-stars span.filled { color: #f59e0b; }

    .t-text {
      color: var(--text);
      font-style: italic;
      line-height: 1.7;
      margin-bottom: 1rem;
      font-size: .93rem;
    }

    .t-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .approve-btn {
      background: #dcfce7;
      color: #166534;
      border: 2px solid #bbf7d0;
      padding: .45rem 1.25rem;
      border-radius: var(--radius);
      font-weight: 700;
      cursor: pointer;
      font-size: .85rem;
      font-family: inherit;
      transition: all .2s;
    }

    .approve-btn:hover {
      background: #bbf7d0;
    }
  `]
})
export class ContentManagerComponent {
  tab: Tab = 'blog';
  saving = false;
  loadingT = false;
  pending: any[] = [];
  toastMsg = '';
  errMsg = '';

  blogForm: FormGroup;
  csForm: FormGroup;
  galleryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public adminService: AdminService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['CyberNova Team'],
      content: ['', Validators.required]
    });

    this.csForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      outcome: ['', Validators.required]
    });

    this.galleryForm = this.fb.group({
      url: ['', Validators.required],
      filename: ['', Validators.required],
      caption: ['']
    });
  }

  setTab(t: Tab): void {
    this.tab = t;
    this.toastMsg = '';
    this.errMsg = '';

    if (t === 'testimonials') {
      this.loadPending();
    }
  }

  bi(f: string): boolean {
    const c = this.blogForm.get(f);
    return !!(c?.invalid && c?.touched);
  }

  ci(f: string): boolean {
    const c = this.csForm.get(f);
    return !!(c?.invalid && c?.touched);
  }

  gi(f: string): boolean {
    const c = this.galleryForm.get(f);
    return !!(c?.invalid && c?.touched);
  }

  publishBlog(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.adminService.publishBlog(this.blogForm.value).subscribe({
      next: () => {
        this.ok('Blog post published successfully!');
        this.blogForm.reset({ author: 'CyberNova Team' });
        this.saving = false;
      },
      error: () => {
        this.err('Failed to publish.');
        this.saving = false;
      }
    });
  }

  publishCS(): void {
    if (this.csForm.invalid) {
      this.csForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.adminService.publishCaseStudy(this.csForm.value).subscribe({
      next: () => {
        this.ok('Case study published!');
        this.csForm.reset();
        this.saving = false;
      },
      error: () => {
        this.err('Failed to publish.');
        this.saving = false;
      }
    });
  }

  addImage(): void {
    if (this.galleryForm.invalid) {
      this.galleryForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    this.adminService.addGalleryImage(this.galleryForm.value).subscribe({
      next: () => {
        this.ok('Image added to gallery!');
        this.galleryForm.reset();
        this.saving = false;
      },
      error: () => {
        this.err('Failed to add image.');
        this.saving = false;
      }
    });
  }

  loadPending(): void {
    this.loadingT = true;

    this.adminService.getPendingTestimonials().subscribe({
      next: (data) => {
        this.pending = data.filter(t => t.approved === false);
        this.loadingT = false;
      },
      error: (err) => {
        console.error('Failed to load pending testimonials:', err);
        this.err('Failed to load pending testimonials.');
        this.loadingT = false;
      }
    });
  }

  approve(id: string): void {
    this.adminService.approveTestimonial(id).subscribe({
      next: () => {
        this.pending = this.pending.filter(t => t.id !== id);
        this.ok('Testimonial approved and now live on the public site.');
      },
      error: () => {
        this.err('Failed to approve testimonial.');
      }
    });
  }

  getStars(rating: number): boolean[] {
    return [1, 2, 3, 4, 5].map(i => i <= (rating || 0));
  }

  getTestimonialName(t: any): string {
    return t.name || t.authorName || t.fullName || 'Anonymous';
  }

  getTestimonialMessage(t: any): string {
    return t.message || t.content || t.testimonial || '';
  }

  ok(msg: string): void {
    this.toastMsg = msg;
    this.errMsg = '';
    setTimeout(() => this.toastMsg = '', 4000);
  }

  err(msg: string): void {
    this.errMsg = msg;
    this.toastMsg = '';
    setTimeout(() => this.errMsg = '', 4000);
  }

  logout(): void {
    this.adminService.logout();
  }
}
