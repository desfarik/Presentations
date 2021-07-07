import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CreateComponent} from "./pages/create/create.component";
import {ViewComponent} from "./pages/view/view.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {LoginComponent} from "./pages/login/login.component";
import {LoginGuard} from "./core/guard/login.guard";
import {PresentationResolver} from "./core/resolver/presentation.resolver";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create/:id',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:id',
    component: CreateComponent,
    canActivate: [AuthGuard],
    resolve: {
      presentation: PresentationResolver
    }
  },
  {
    path: 'view/:id',
    component: ViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
