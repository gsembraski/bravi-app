import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { PersonDatailsComponent } from './pages/person-datails/person-datails.component';
import { BracketsComponent } from './pages/brackets/brackets.component';

const routes: Routes = [
  { path:"", redirectTo:"agenda", pathMatch:"full"},
  { path:"brackets", component: BracketsComponent },
  { path:"agenda", component: AgendaComponent },
  { path:"agenda/:personId", component: PersonDatailsComponent },
  { path:"agenda/:personId/contact/:contactId?", component: PersonDatailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
