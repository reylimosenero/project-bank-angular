import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'budget-list', pathMatch: 'full' },
  {path: 'budget-list', component: BudgetListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
