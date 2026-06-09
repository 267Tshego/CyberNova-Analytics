import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'blog_posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );
    return from(getDocs(q)).pipe(
      map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }

  getCaseStudies(): Observable<any[]> {
    const q = query(collection(this.firestore, 'case_studies'), orderBy('createdAt', 'desc'));
    return from(getDocs(q)).pipe(
      map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }

  getAllTestimonials(): Observable<any[]> {
    const ref = collection(this.firestore, 'testimonials');
    return from(getDocs(ref)).pipe(
      map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }

  getApprovedTestimonials(): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'testimonials'),
      where('approved', '==', true)
    );
    return from(getDocs(q)).pipe(
      map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }

  getGallery(): Observable<any[]> {
    const q = query(collection(this.firestore, 'gallery_images'), orderBy('uploadedAt', 'desc'));
    return from(getDocs(q)).pipe(
      map(snap => snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }
}
