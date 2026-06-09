import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-page">
      <div class="login-left">
        <div class="login-brand">
          <img src="assets/logo.png" alt="CyberNova" class="brand-logo">
          <div>
            <div class="brand-name">CYBERNOVA</div>
            <div class="brand-sub">ANALYTICS</div>
          </div>
        </div>
        <h1>Secure Admin Portal</h1>
        <p>Manage your platform, review security requests, and monitor analytics — all in one place.</p>
        <div class="login-features">
          @for (f of features; track f) {
            <div class="login-feature">
              <span class="feat-check">✓</span> {{ f }}
            </div>
          }
        </div>
      </div>

      <div class="login-right">
        <div class="login-card">
          <div class="card-header">
            <h2>Sign In</h2>
            <p>Authorised personnel only</p>
          </div>

          @if (error) {
            <div class="login-error">
              <span>⚠️</span> {{ error }}
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="onLogin()">
            <div class="form-group">
              <label>Username</label>
              <input formControlName="username" placeholder="Enter your username"
                     autocomplete="username">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input formControlName="password" [type]="showPw ? 'text' : 'password'"
                     placeholder="Enter your password" autocomplete="current-password">
              <button type="button" class="pw-toggle" (click)="showPw = !showPw">
                {{ showPw ? 'Hide' : 'Show' }}
              </button>
            </div>
            <button type="submit" class="login-btn" [disabled]="isLoading">
              @if (isLoading) { <span class="spin">⟳</span> Authenticating... }
              @else { Sign In }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
      background: var(--navy-dark);
    }
    .login-left {
      padding: 4rem; display: flex; flex-direction: column;
      justify-content: center; color: white;
    }
    .login-brand { display: flex; align-items: center; gap: .75rem;
      margin-bottom: 3rem; }
    .brand-logo  { height: 48px; filter: brightness(0) invert(1); }
    .brand-name  { font-size: .9rem; font-weight: 800; letter-spacing: 1.5px; color: white; }
    .brand-sub   { font-size: .6rem; font-weight: 500; letter-spacing: 2px; color: #7ea8d8; }
    .login-left h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem;
      line-height: 1.2; }
    .login-left p  { color: #94a3b8; font-size: 1rem; line-height: 1.7;
      max-width: 400px; margin-bottom: 2.5rem; }
    .login-features { display: flex; flex-direction: column; gap: .75rem; }
    .login-feature  { color: #b0c4de; font-size: .9rem; display: flex;
      align-items: center; gap: .75rem; }
    .feat-check { color: #4ade80; font-weight: 700; }

    .login-right {
      background: var(--bg); display: flex; align-items: center;
      justify-content: center; padding: 3rem;
    }
    .login-card {
      background: white; border-radius: var(--radius-lg); padding: 2.5rem;
      width: 100%; max-width: 420px;
      box-shadow: 0 20px 60px rgba(0,0,0,.12); border: 1px solid var(--border);
    }
    .card-header { margin-bottom: 2rem; }
    .card-header h2 { font-size: 1.75rem; font-weight: 800; color: var(--navy-dark); }
    .card-header p  { color: var(--text-muted); font-size: .88rem; margin-top: .25rem; }

    .login-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b;
      padding: .85rem 1rem; border-radius: var(--radius);
      margin-bottom: 1.5rem; font-size: .88rem; font-weight: 500;
      display: flex; gap: .5rem; align-items: center; }

    .form-group { display: flex; flex-direction: column; gap: .45rem;
      margin-bottom: 1.25rem; position: relative; }
    label { font-weight: 600; font-size: .875rem; color: var(--text); }
    input { padding: .75rem 1rem; border: 2px solid var(--border);
      border-radius: var(--radius); font-size: .95rem; outline: none;
      transition: border-color .2s; width: 100%; }
    input:focus { border-color: var(--blue); }

    .pw-toggle { position: absolute; right: 1rem; bottom: .75rem;
      background: none; border: none; color: var(--blue);
      font-size: .8rem; font-weight: 600; cursor: pointer; }

    .login-btn {
      width: 100%; background: var(--navy-dark); color: white; border: none;
      padding: .9rem; border-radius: var(--radius); font-size: 1rem;
      font-weight: 700; cursor: pointer; transition: background .2s;
      margin-top: .5rem;
    }
    .login-btn:hover:not(:disabled) { background: var(--navy); }
    .login-btn:disabled { opacity: .6; cursor: not-allowed; }
    .spin { display: inline-block; animation: spin .6s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .login-page { grid-template-columns: 1fr; }
      .login-left { display: none; }
      .login-right { background: var(--navy-dark); }
    }
  `]
})
export class LoginComponent {
  form: FormGroup;
  error    = '';
  isLoading = false;
  showPw   = false;

  features = [
    'Review all security requests in real time',
    'Analyse geographic and service-type trends',
    'Publish blog posts and case studies',
    'Approve client testimonials',
  ];

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    if (this.adminService.isLoggedIn()) this.router.navigate(['/admin/dashboard']);
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.form.invalid) return;
    this.isLoading = true; this.error = '';
    const { username, password } = this.form.value;
    this.adminService.login(username, password).subscribe({
      next: ()  => this.router.navigate(['/admin/dashboard']),
      error: err => {
        this.error = err.status === 401 ? 'Invalid username or password.' : 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
