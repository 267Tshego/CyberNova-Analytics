import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../../core/services/content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Testimonials</p>
        <h1>What Our Clients Say</h1>
        <p>Trusted by organisations across Southern Africa to protect what matters most.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (testimonials.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">💬</div>
            <h3>Be the first to share your experience</h3>
            <p>Submit a testimonial below after working with our team.</p>
          </div>
        }

        @if (testimonials.length > 0) {
          <div class="testimonials-grid">
            @for (t of testimonials; track t.id) {
              <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">{{ t.content }}</p>
                <div class="star-row">
                  @for (s of getStarsArray(t.rating); track $index) {
                    <span class="star" [class.filled]="s">★</span>
                  }
                </div>
                <div class="testimonial-author">
                  <div class="author-avatar">{{ t.authorName?.charAt(0) ?? 'C' }}</div>
                  <div>
                    <div class="author-name">{{ t.authorName }}</div>
                    @if (t.company) {
                      <div class="author-company">{{ t.company }}</div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- Submit Form -->
        <div class="submit-section">
          <div class="submit-header">
            <h2>Share Your Experience</h2>
            <p>Your feedback helps us improve and helps others make informed decisions.</p>
          </div>

          @if (tsSuccess) {
            <div class="alert success">
              <span>✅</span> {{ tsSuccess }}
            </div>
          }
          @if (tsError) {
            <div class="alert error">
              <span>❌</span> {{ tsError }}
            </div>
          }

          <form [formGroup]="tForm" (ngSubmit)="submitTestimonial()" class="submit-form">
            <div class="form-row">
              <div class="form-group">
                <label>Your Name *</label>
                <input formControlName="authorName" placeholder="Jane Doe">
              </div>
              <div class="form-group">
                <label>Company / Organisation</label>
                <input formControlName="company" placeholder="ABC Corp (optional)">
              </div>
            </div>
            <div class="form-group">
              <label>Your Experience *</label>
              <textarea formControlName="content" rows="5"
                        placeholder="Tell us about your experience working with CyberNova Analytics..."></textarea>
            </div>
            <div class="form-group">
              <label>Rating *</label>
              <div class="rating-input">
                @for (s of [1,2,3,4,5]; track s) {
                  <button type="button" class="rate-btn"
                          (click)="tForm.patchValue({rating: s})"
                          [class.active]="tForm.get('rating')?.value >= s">★</button>
                }
                <span class="rating-text">
                  {{ tForm.get('rating')?.value > 0 ? ratingLabels[tForm.get('rating')?.value - 1] : 'Select a rating' }}
                </span>
              </div>
            </div>
            <button type="submit" class="btn-primary submit-btn" [disabled]="tForm.invalid || submitting">
              {{ submitting ? 'Submitting...' : 'Submit Testimonial' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; }

    .empty-state { text-align: center; padding: 4rem 0; }
    .empty-icon  { font-size: 4rem; margin-bottom: 1rem; }
    .empty-state h3 { font-size: 1.5rem; color: var(--navy-dark); margin-bottom: .5rem; }
    .empty-state p  { color: var(--text-muted); }

    .testimonials-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem; margin-bottom: 4rem;
    }
    .testimonial-card {
      background: white; border-radius: var(--radius-lg); padding: 2rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
      display: flex; flex-direction: column; gap: 1rem;
      transition: box-shadow .2s, transform .2s;
    }
    .testimonial-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .quote-icon { font-size: 4rem; color: var(--blue-light); line-height: .5;
      font-family: Georgia, serif; font-weight: 900; }
    .testimonial-text { color: var(--text); line-height: 1.7; font-size: .95rem;
      font-style: italic; flex: 1; }
    .star-row { display: flex; gap: .2rem; }
    .star { font-size: 1.1rem; color: #d1d5db; }
    .star.filled { color: #f59e0b; }
    .testimonial-author { display: flex; align-items: center; gap: .75rem;
      padding-top: 1rem; border-top: 1px solid var(--border); }
    .author-avatar { width: 42px; height: 42px; border-radius: 50%;
      background: var(--navy); color: white; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .author-name    { font-weight: 700; color: var(--navy-dark); font-size: .9rem; }
    .author-company { color: var(--text-muted); font-size: .82rem; }

    /* Submit section */
    .submit-section {
      background: white; border-radius: var(--radius-lg); padding: 2.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
    }
    .submit-header { margin-bottom: 2rem; }
    .submit-header h2 { font-size: 1.5rem; font-weight: 800; color: var(--navy-dark);
      margin-bottom: .5rem; }
    .submit-header p  { color: var(--text-muted); }

    .alert { padding: 1rem 1.25rem; border-radius: var(--radius);
      margin-bottom: 1.5rem; font-weight: 500;
      display: flex; align-items: center; gap: .75rem; }
    .alert.success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
    .alert.error   { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

    .submit-form { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: .5rem; }
    .form-group label { font-weight: 600; font-size: .88rem; color: var(--text); }
    input, textarea {
      padding: .75rem 1rem; border: 2px solid var(--border); border-radius: var(--radius);
      font-size: .95rem; font-family: inherit; outline: none;
      transition: border-color .2s;
    }
    input:focus, textarea:focus { border-color: var(--blue); }

    .rating-input { display: flex; align-items: center; gap: .25rem; }
    .rate-btn { background: none; border: none; font-size: 2rem; cursor: pointer;
      color: #d1d5db; transition: color .1s, transform .1s; }
    .rate-btn:hover, .rate-btn.active { color: #f59e0b; }
    .rate-btn.active { transform: scale(1.1); }
    .rating-text { margin-left: .75rem; font-size: .88rem; color: var(--text-muted);
      font-weight: 500; }

    .submit-btn { align-self: flex-start; padding: .8rem 2.5rem; }
    .submit-btn:disabled { opacity: .6; cursor: not-allowed; }

    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
  `]
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];
  tForm: FormGroup;
  tsSuccess  = '';
  tsError    = '';
  submitting = false;

  ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  constructor(private cs: ContentService, private fb: FormBuilder, private http: HttpClient) {
    this.tForm = this.fb.group({
      authorName: ['', Validators.required],
      company:    [''],
      content:    ['', [Validators.required, Validators.minLength(10)]],
      rating:     [0,  [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.cs.getApprovedTestimonials().subscribe(t => this.testimonials = t);
  }

  getStarsArray(rating: number): boolean[] {
    return [1,2,3,4,5].map(i => i <= (rating || 0));
  }

  submitTestimonial() {
    if (this.tForm.invalid) { this.tForm.markAllAsTouched(); return; }
    this.submitting = true;
    this.http.post(`${environment.contentApi}/testimonials`, this.tForm.value).subscribe({
      next: () => {
        this.tsSuccess = 'Thank you! Your testimonial has been submitted and is pending review.';
        this.tsError = '';
        this.tForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.tsError = 'Submission failed. Please try again.';
        this.submitting = false;
      }
    });
  }
}
