import { ReproductorComponent } from './components/reproductor/reproductor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';

const routes: Routes = [
  { path: '', component: ReproductorComponent },
  { path: 'agregar', component: AgregarCancionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
