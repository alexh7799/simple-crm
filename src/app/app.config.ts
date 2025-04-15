import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-399dd","appId":"1:547257804685:web:8e7cf7444fb16888c03fc4","storageBucket":"simple-crm-399dd.firebasestorage.app","apiKey":"AIzaSyDq5lNSlOzlXQsM7MqIrvCQVNOmwhDHSEk","authDomain":"simple-crm-399dd.firebaseapp.com","messagingSenderId":"547257804685"})), provideFirestore(() => getFirestore())]
};
