import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="nav-container">

        <!-- Logo -->
        <a routerLink="/" class="nav-logo">
          <img
            ngSrc="assets/logo.png"
            alt="CyberNova Analytics"
            class="logo-img"
            width="48"
            height="48"
            priority
          >

          <div class="logo-text">
            <span class="logo-name">CYBERNOVA</span>
            <span class="logo-sub">ANALYTICS</span>
          </div>
        </a>

        <nav class="nav-links" [class.open]="menuOpen">
          <a routerLink="/"
             routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: true }"
             (click)="menuOpen = false">
            Home
          </a>

          <a routerLink="/services"
             routerLinkActive="active"
             (click)="menuOpen = false">
            Solutions
          </a>

          <a routerLink="/case-studies"
             routerLinkActive="active"
             (click)="menuOpen = false">
            Case Studies
          </a>

          <a routerLink="/blog"
             routerLinkActive="active"
             (click)="menuOpen = false">
            Blog
          </a>

          <a routerLink="/testimonials"
             routerLinkActive="active"
             (click)="menuOpen = false">
            Testimonials
          </a>

          <a routerLink="/gallery"
             routerLinkActive="active"
             (click)="menuOpen = false">
            Gallery
          </a>

            <a routerLink="/admin/dashboard"
               routerLinkActive="active"
               class="admin-link"
               (click)="menuOpen = false">
              Admin
            </a>
        </nav>

        <!-- CTA -->
        <div class="nav-cta">
          <a routerLink="/contact" class="btn-primary">Contact Security Team</a>
          <button class="hamburger" (click)="menuOpen = !menuOpen" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(15, 29, 51, 0.12);
      transition: box-shadow .3s;
    }

    .header.scrolled {
      box-shadow: 0 2px 20px rgba(15, 29, 51, 0.12);
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 2rem;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .nav-logo {
      display: flex;
      align-items: center;
      gap: .75rem;
      flex-shrink: 0;
      text-decoration: none;
    }

    .logo-img {
      height: 44px;
      width: auto;
      object-fit: contain;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .logo-name {
      font-size: .95rem;
      font-weight: 800;
      color: #0f1d33;
      letter-spacing: 1.5px;
    }

    .logo-sub {
      font-size: .65rem;
      font-weight: 600;
      color: #0f1d33;
      letter-spacing: 2px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: .25rem;
      flex: 1;
      justify-content: center;
    }

    .nav-links a {
      color: #0f1d33;
      font-size: .9rem;
      font-weight: 600;
      padding: .5rem .9rem;
      border-radius: 6px;
      text-decoration: none;
      transition: color .2s, background .2s;
    }

    .nav-links a:hover {
      color: #0f1d33;
      background: rgba(15, 29, 51, 0.08);
    }

    .nav-links a.active {
      color: #0f1d33;
      background: rgba(15, 29, 51, 0.12);
    }

    .admin-link {
      color: #0f1d33 !important;
    }

    .nav-cta {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-shrink: 0;
    }

    .btn-primary {
      font-size: .85rem;
      padding: .6rem 1.25rem;
      white-space: nowrap;
      background: #0f1d33;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background .2s;
    }

    .btn-primary:hover {
      background: #162b4d;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      padding: .5rem;
      cursor: pointer;
    }

    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: #0f1d33;
      border-radius: 2px;
      transition: all .3s;
    }

    @media (max-width: 900px) {
      .hamburger {
        display: flex;
      }

      .nav-links {
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem 2rem 2rem;
        gap: .5rem;
        align-items: flex-start;
        border-bottom: 1px solid rgba(15, 29, 51, 0.12);
        box-shadow: 0 10px 25px rgba(15, 29, 51, 0.12);
      }

      .nav-links.open {
        display: flex;
      }

      .nav-links a {
        padding: .75rem 1rem;
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen   = false;
  constructor(public adminService: AdminService) {}

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 10; }
}
