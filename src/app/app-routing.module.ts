import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { BracketsComponent } from './pages/brackets/brackets.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';

const routes: Routes = [
  { path:"", redirectTo:"agenda", pathMatch:"full"},
  { path:"brackets", component: BracketsComponent },
  { path:"agenda", component: AgendaComponent },
  { path:"agenda/new-item", component: PersonDetailsComponent },
  { path:"agenda/:personId", component: PersonDetailsComponent },
  { path:"agenda/:personId/contact/new-item", component: ContactDetailsComponent },
  { path:"agenda/:personId/contact/:contactId?", component: ContactDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
