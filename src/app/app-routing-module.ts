import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { ProjectsComponent } from './projects/projects.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'budget-request', pathMatch: 'full' },
  { path: 'project-list', component: ProjectsComponent },
  { path: 'budget-request', component: BudgetListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
