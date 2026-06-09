import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">

              <img
                ngSrc="assets/logo2.png"
                alt="CyberNova Analytics"
                class="logo-img"
                width="48"
                height="56"
                priority
              >

              <p>Securing Southern Africa with intelligent, AI-driven cybersecurity solutions for businesses of every size.</p>
              <div class="social-links">
                <a href="#" aria-label="LinkedIn">in</a>
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="YouTube">▶</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Solutions</h4>
              <ul>
                <li><a routerLink="/services">AI Cyber Assistant</a></li>
                <li><a routerLink="/services">Network Security Audit</a></li>
                <li><a routerLink="/services">Penetration Testing</a></li>
                <li><a routerLink="/services">Managed Monitoring</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a routerLink="/case-studies">Case Studies</a></li>
                <li><a routerLink="/blog">Blog</a></li>
                <li><a routerLink="/gallery">Gallery</a></li>
                <li><a routerLink="/testimonials">Testimonials</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a routerLink="/contact">Get in Touch</a></li>
                <li><a routerLink="/contact">Request Assessment</a></li>
                <li><span>Gaborone, Botswana</span></li>
                <li><span>info&#64;cybernova.co.bw</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>© 2025 CyberNova Analytics Ltd. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--navy-dark); color: #94a3b8; font-size: .9rem; }
    .footer-top { padding: 4rem 0; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
    .footer-logo { height: 52px; margin-bottom: 1rem; filter: brightness(0) invert(1); }
    .footer-brand p { line-height: 1.7; margin-bottom: 1.5rem; }
    .social-links { display: flex; gap: .75rem; }
    .social-links a {
      width: 36px; height: 36px; border-radius: 50%;
      border: 1px solid #334155; display: flex; align-items: center;
      justify-content: center; color: #94a3b8; font-size: .85rem;
      font-weight: 700; transition: all .2s;
    }
    .social-links a:hover { border-color: var(--blue); color: var(--blue); }
    .footer-col h4 { color: white; font-size: .95rem; font-weight: 700;
                     margin-bottom: 1.25rem; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: .7rem; }
    .footer-col a, .footer-col span { color: #94a3b8; transition: color .2s; }
    .footer-col a:hover { color: white; }
    .footer-bottom {
      border-top: 1px solid #1e293b; padding: 1.5rem 0;
    }
    .footer-bottom .container {
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-links { display: flex; gap: 1.5rem; }
    .footer-links a { color: #94a3b8; font-size: .85rem; transition: color .2s; }
    .footer-links a:hover { color: white; }
    @media (max-width: 768px) {
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
      .footer-bottom .container { flex-direction: column; gap: 1rem; text-align: center; }
    }
  `]
})
export class FooterComponent {}
