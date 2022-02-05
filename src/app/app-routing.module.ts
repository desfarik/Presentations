import { MainComponent } from './modules/main/main.component';
import { CreateComponent } from './modules/create/create.component';
import { ViewComponent } from './modules/view/view.component';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { LoginGuard } from './core/guard/login.guard';
import { PresentationResolver } from './core/resolver/presentation.resolver';
import { AdminGuard } from './core/guard/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create/:id',
    component: CreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'edit/:id',
    component: CreateComponent,
    canActivate: [AuthGuard, AdminGuard],
    resolve: {
      presentation: PresentationResolver,
    },
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    canActivate: [AuthGuard],
    resolve: {
      presentation: PresentationResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'course',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule),
  },
  {
    path: '**',
    component: MainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
