import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDatailsComponent } from './contact-datails.component';

describe('ContactDatailsComponent', () => {
  let component: ContactDatailsComponent;
  let fixture: ComponentFixture<ContactDatailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDatailsComponent]
    });
    fixture = TestBed.createComponent(ContactDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
