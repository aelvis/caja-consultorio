import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Admin
import { InicioComponent} from './component/inicio/inicio.component';
import { LoginComponent} from './component/login/login.component';
import { AtencionComponent } from './component/atencion/atencion.component';
import { AtencionEditarComponent } from './component/atencion-editar/atencion-editar.component';
import { CitaComponent } from './component/cita/cita.component';
import { MedicoComponent } from './component/medico/medico.component';
import { AdminGuard } from './services/admin.guard';

const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: 'login', component: LoginComponent},
	{path: 'inicio', component: CitaComponent, canActivate: [AdminGuard]},
	{path: 'cita', component: CitaComponent, canActivate: [AdminGuard]},
	{path: 'medico', component: MedicoComponent, canActivate: [AdminGuard]},
	{path: '**', component: LoginComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { enableTracing: false, useHash:true });