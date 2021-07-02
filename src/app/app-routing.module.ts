import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {CreateComponent} from "./pages/create/create.component";
import {ViewComponent} from "./pages/view/view.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'create/:id',
    component: CreateComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: '**',
    component: MainComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
