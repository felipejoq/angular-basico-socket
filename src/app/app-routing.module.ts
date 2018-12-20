import { UsuarioGuard } from './guards/usuario-guard.service';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const appRoutes:Routes = [
{ path: '', component: LoginComponent },
{
  path: 'mensajes',
  component: MensajesComponent,
  canActivate: [ UsuarioGuard ]
 },
{ path: '**', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
