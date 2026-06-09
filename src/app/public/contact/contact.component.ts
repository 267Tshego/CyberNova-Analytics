import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubmissionService } from '../../core/services/submission.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Get in Touch</p>
        <h1>Contact Security Team</h1>
        <p>Submit your request and our security experts will respond within 4 hours.</p>
      </div>
    </div>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-layout">

          <!-- Info Panel -->
          <aside class="contact-info">
            <h2>How It Works</h2>
            <div class="steps">
              @for (step of steps; track step.num) {
                <div class="step">
                  <div class="step-num">{{ step.num }}</div>
                  <div>
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.desc }}</p>
                  </div>
                </div>
              }
            </div>
            <div class="contact-details">
              <div class="contact-item">
                <div>
                  <strong>Location</strong>
                  <p>Gaborone, Botswana</p>
                </div>
              </div>
              <div class="contact-item">
                <div>
                  <strong>Email</strong>
                  <p>security&#64;cybernova.co.bw</p>
                </div>
              </div>
              <div class="contact-item">
                <div>
                  <strong>Response Time</strong>
                  <p>Within 4 business hours</p>
                </div>
              </div>
            </div>
          </aside>

          <!-- Form -->
          <div class="form-panel">
            @if (successMessage) {
              <div class="alert success">
                <div>
                  <strong>Request Submitted</strong>
                  <p>{{ successMessage }}</p>
                </div>
              </div>
            }
            @if (errorMessage) {
              <div class="alert error">
                <p>{{ errorMessage }}</p>
              </div>
            }

            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name <span class="req">*</span></label>
                  <input formControlName="fullName" placeholder="John Doe">
                  @if (invalid('fullName')) {
                    <span class="field-err">Required</span>
                  }
                </div>
                <div class="form-group">
                  <label>Email Address <span class="req">*</span></label>
                  <input formControlName="email" type="email" placeholder="john@company.com">
                  @if (invalid('email')) {
                    <span class="field-err">Valid email required</span>
                  }
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Phone Number</label>
                  <input formControlName="phone" placeholder="+267 71 234 567">
                </div>
                <div class="form-group">
                  <label>Organisation</label>
                  <input formControlName="organization" placeholder="Company name">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Country <span class="req">*</span></label>
                  <select formControlName="country">
                    <option value="">Select country...</option>
                    @for (c of countries; track c) {
                      <option [value]="c">{{ c }}</option>
                    }
                  </select>
                  @if (invalid('country')) {
                    <span class="field-err">Required</span>
                  }
                </div>
                <div class="form-group">
                  <label>Job Title</label>
                  <input formControlName="jobTitle" placeholder="e.g. IT Manager, CISO">
                </div>
              </div>
              <div class="form-group">
                <label>Type of Security Issue <span class="req">*</span></label>
                <select formControlName="issueType">
                  <option value="">Select issue type...</option>
                  @for (t of issueTypes; track t) {
                    <option [value]="t">{{ t }}</option>
                  }
                </select>
                @if (invalid('issueType')) {
                  <span class="field-err">Required</span>
                }
              </div>
              <div class="form-group">
                <label>Description <span class="req">*</span></label>
                <textarea formControlName="description" rows="6"
                          placeholder="Describe your security concern in detail — include when it started, what systems are affected, and any steps already taken..."></textarea>
                @if (invalid('description')) {
                  <span class="field-err">Minimum 20 characters</span>
                }
              </div>
              <button type="submit" class="btn-primary submit-btn" [disabled]="isSubmitting">
                @if (isSubmitting) { <span class="spin">⟳</span> Submitting... }
                @else { Send Request }
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; max-width: 500px; }

    .contact-section { background: var(--bg); }
    .contact-layout { display: grid; grid-template-columns: 380px 1fr; gap: 3rem; }

    /* Info panel */
    .contact-info { display: flex; flex-direction: column; gap: 2.5rem; }
    .contact-info h2 { font-size: 1.4rem; font-weight: 800; color: var(--navy-dark); }
    .steps { display: flex; flex-direction: column; gap: 1.25rem; }
    .step { display: flex; gap: 1rem; align-items: flex-start; }
    .step-num { width: 32px; height: 32px; border-radius: 50%; background: var(--blue);
      color: white; font-weight: 700; font-size: .85rem;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .step h4 { font-size: .9rem; font-weight: 700; color: var(--navy-dark); margin-bottom: .2rem; }
    .step p  { font-size: .85rem; color: var(--text-muted); line-height: 1.5; }

    .contact-details { display: flex; flex-direction: column; gap: 1rem;
      padding: 1.5rem; background: white; border-radius: var(--radius-lg);
      border: 1px solid var(--border); box-shadow: var(--shadow-sm); }
    .contact-item { display: flex; gap: 1rem; align-items: flex-start; }
    .ci-icon { font-size: 1.25rem; margin-top: .1rem; }
    .contact-item strong { display: block; font-size: .85rem; font-weight: 700;
      color: var(--navy-dark); margin-bottom: .2rem; }
    .contact-item p { font-size: .85rem; color: var(--text-muted); margin: 0; }

    /* Form panel */
    .form-panel {
      background: white; border-radius: var(--radius-lg); padding: 2.5rem;
      box-shadow: var(--shadow-sm); border: 1px solid var(--border);
    }

    .alert { display: flex; gap: 1rem; padding: 1rem 1.25rem; border-radius: var(--radius);
      margin-bottom: 1.5rem; }
    .alert.success { background: #00ff00; border: 1px solid #00ff00; color: #000000; }
    .alert.error   { background: #ff0000; border: 1px solid #ff0000; color: #000000; }
    .alert-icon { font-size: 1.25rem; flex-shrink: 0; }
    .alert strong { display: block; font-size: .95rem; margin-bottom: .25rem; }
    .alert p { margin: 0; font-size: .88rem; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: .45rem; margin-bottom: 1.25rem; }
    label { font-weight: 600; font-size: .875rem; color: var(--text); }
    .req { color: #ef4444; }
    input, select, textarea {
      padding: .75rem 1rem; border: 2px solid var(--border); border-radius: var(--radius);
      font-size: .95rem; font-family: inherit; outline: none;
      transition: border-color .2s; background: var(--bg);
    }
    input:focus, select:focus, textarea:focus { border-color: var(--blue); background: white; }
    .field-err { font-size: .78rem; color: #ef4444; font-weight: 500; }

    .submit-btn { width: 100%; padding: .9rem; font-size: 1rem;
      font-weight: 700; border: none; border-radius: var(--radius);
      background: var(--blue); color: white; cursor: pointer;
      transition: background .2s; }
    .submit-btn:hover:not(:disabled) { background: #0052a3; }
    .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
    .spin { display: inline-block; animation: spin .6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 900px) {
      .contact-layout { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  form: FormGroup;
  successMessage = '';
  errorMessage   = '';
  isSubmitting   = false;

  steps = [
    { num: '1', title: 'Submit your request', desc: 'Fill in the form with details about your security concern.' },
    { num: '2', title: 'Expert review',        desc: 'Our team assesses your issue and assigns the right specialist.' },
    { num: '3', title: 'We respond',           desc: 'You receive a tailored response within 4 business hours.' },
  ];

  issueTypes = ['Network Intrusion', 'Malware / Ransomware', 'Data Breach',
    'Phishing Attack', 'System Vulnerability', 'Denial of Service (DoS)',
    'Insider Threat', 'Compliance Concern', 'Other'];

  countries = ['Botswana', 'South Africa', 'Zimbabwe', 'Zambia', 'Namibia',
    'Mozambique', 'Tanzania', 'Malawi', 'Lesotho', 'Eswatini', 'Other'];

  constructor(private fb: FormBuilder, private svc: SubmissionService) {
    this.form = this.fb.group({
      fullName:     ['', [Validators.required, Validators.minLength(2)]],
      email:        ['', [Validators.required, Validators.email]],
      phone:        [''],
      organization: [''],
      country:      ['', Validators.required],
      jobTitle:     [''],
      issueType:    ['', Validators.required],
      description:  ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  invalid(f: string): boolean {
    const c = this.form.get(f);
    return !!(c?.invalid && c?.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting = true;
    this.svc.submitContactForm(this.form.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.form.reset(); this.isSubmitting = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        this.errorMessage = 'Submission failed. Please check your connection and try again.';
        this.isSubmitting = false;
      }
    });
  }
}
