import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonDatailsComponent } from './pages/person-datails/person-datails.component';
import { ContactDatailsComponent } from './pages/contact-datails/contact-datails.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { BracketsComponent } from './pages/brackets/brackets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonDatailsComponent,
    ContactDatailsComponent,
    AgendaComponent,
    BracketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
