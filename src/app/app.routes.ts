import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { HomeComponent }           from './public/home/home.component';
import { ServicesPageComponent }   from './public/services-page/services-page.component';
import { BlogComponent }           from './public/blog/blog.component';
import { BlogDetailComponent }     from './public/blog-detail/blog-detail.component';
import { CaseStudiesComponent }    from './public/case-studies/case-studies.component';
import { TestimonialsComponent }   from './public/testimonials/testimonials.component';
import { GalleryComponent }        from './public/gallery/gallery.component';
import { ContactComponent }        from './public/contact/contact.component';
import { LoginComponent }          from './admin/login/login.component';
import { DashboardComponent }      from './admin/dashboard/dashboard.component';
import { RequestsComponent }       from './admin/requests/requests.component';
import { AnalyticsComponent }      from './admin/analytics/analytics.component';
import { ContentManagerComponent } from './admin/content-manager/content-manager.component';

export const routes: Routes = [
  { path: '',              component: HomeComponent },
  { path: 'services',      component: ServicesPageComponent },
  { path: 'blog',          component: BlogComponent },
  { path: 'blog/:id',      component: BlogDetailComponent },
  { path: 'case-studies',  component: CaseStudiesComponent },
  { path: 'testimonials',  component: TestimonialsComponent },
  { path: 'gallery',       component: GalleryComponent },
  { path: 'contact',       component: ContactComponent },
  { path: 'admin/login',   component: LoginComponent },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/requests',
    component: RequestsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/analytics',
    component: AnalyticsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/content',
    component: ContentManagerComponent,
    canActivate: [authGuard]
  },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: '**',    redirectTo: '' }
];
