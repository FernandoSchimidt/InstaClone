import { Routes } from '@angular/router'
import { AcessoComponent } from './acesso/acesso.component'
import { AuthGuard } from './auth-guard.service'
import { HomeComponent } from './home/home.component'

export const ROUTES: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
]
