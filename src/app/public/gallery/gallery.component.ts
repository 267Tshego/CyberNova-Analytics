import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  template: `
    <div class="page-hero">
      <div class="container">
        <p class="section-label">Gallery</p>
        <h1>Events & Workshops</h1>
        <p>CyberNova in action — training sessions, client events and team activities.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading) {
          <div class="loading-grid">
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="skeleton-img"></div>
            }
          </div>
        }

        @if (!loading && images.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">🖼️</div>
            <h3>Gallery coming soon</h3>
            <p>Photos from our upcoming workshops and events will appear here.</p>
          </div>
        }

        @if (!loading && images.length > 0) {
          <div class="gallery-grid">
            @for (img of images; track img.id) {
              <div class="gallery-item" (click)="openLightbox(img)">
                <img
                  [src]="img.url || 'https://placehold.co/600x400/1B2B4B/white?text=' + encodeLabel(img.filename)"
                  [alt]="img.caption || img.filename"
                  loading="lazy">
                <div class="gallery-overlay">
                  <div class="overlay-content">
                    @if (img.caption) {
                      <p>{{ img.caption }}</p>
                    }
                    <span class="view-btn">View ↗</span>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>

    <!-- Lightbox -->
    @if (lightboxImg) {
      <div class="lightbox" (click)="closeLightbox()">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()">✕</button>
          <img [src]="lightboxImg.url" [alt]="lightboxImg.caption">
          @if (lightboxImg.caption) {
            <p class="lightbox-caption">{{ lightboxImg.caption }}</p>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .page-hero { background: var(--navy-dark); color: white; padding: 5rem 0 4rem; }
    .page-hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 1rem; }
    .page-hero p  { color: #94a3b8; font-size: 1.1rem; }

    .loading-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
    .skeleton-img { height: 250px; background: #e2e8f0; border-radius: var(--radius-lg);
      animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }

    .empty-state { text-align: center; padding: 6rem 0; }
    .empty-icon  { font-size: 4rem; margin-bottom: 1rem; }
    .empty-state h3 { font-size: 1.5rem; color: var(--navy-dark); margin-bottom: .5rem; }
    .empty-state p  { color: var(--text-muted); }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px,1fr));
      gap: 1rem;
    }
    .gallery-item {
      position: relative; border-radius: var(--radius-lg); overflow: hidden;
      cursor: pointer; aspect-ratio: 4/3;
      box-shadow: var(--shadow-sm);
    }
    .gallery-item img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform .4s;
    }
    .gallery-item:hover img { transform: scale(1.05); }
    .gallery-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(15,29,51,.85) 0%, transparent 50%);
      opacity: 0; transition: opacity .3s;
      display: flex; align-items: flex-end; padding: 1.25rem;
    }
    .gallery-item:hover .gallery-overlay { opacity: 1; }
    .overlay-content p { color: white; font-size: .9rem; font-weight: 500; margin-bottom: .5rem; }
    .view-btn { color: #7ea8d8; font-size: .82rem; font-weight: 600; }

    /* Lightbox */
    .lightbox {
      position: fixed; inset: 0; background: rgba(0,0,0,.9);
      z-index: 2000; display: flex; align-items: center; justify-content: center;
      padding: 2rem;
    }
    .lightbox-content {
      position: relative; max-width: 900px; width: 100%;
    }
    .lightbox-close {
      position: absolute; top: -2.5rem; right: 0; background: none; border: none;
      color: white; font-size: 1.5rem; cursor: pointer; font-weight: 700;
    }
    .lightbox-content img { width: 100%; border-radius: var(--radius-lg);
      max-height: 80vh; object-fit: contain; }
    .lightbox-caption { color: #94a3b8; text-align: center; margin-top: 1rem;
      font-size: .9rem; }
  `]
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  loading = true;
  lightboxImg: any = null;

  constructor(private cs: ContentService) {}
  ngOnInit() {
    this.cs.getGallery().subscribe({
      next: i => { this.images = i; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  encodeLabel(text: string): string {
    return encodeURIComponent(text?.replace(/\.[^/.]+$/, '') ?? 'Image');
  }

  openLightbox(img: any): void  { this.lightboxImg = img; }
  closeLightbox(): void          { this.lightboxImg = null; }
}
