import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonDetailsComponent } from './pages/person-details/person-details.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { BracketsComponent } from './pages/brackets/brackets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonDetailsComponent,
    ContactDetailsComponent,
    AgendaComponent,
    BracketsComponent,
    ModalMessageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
