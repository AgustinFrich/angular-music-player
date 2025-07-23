import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { BaraInferiorComponent } from './components/bara-inferior/bara-inferior.component';
import { TiempoPipePipe } from './pipes/tiempo-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ReproductorComponent,
    BaraInferiorComponent,
    TiempoPipePipe,
    AgregarCancionComponent,
    NavegacionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterOutlet,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
