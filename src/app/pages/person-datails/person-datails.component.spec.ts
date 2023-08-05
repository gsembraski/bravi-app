import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDatailsComponent } from './person-datails.component';

describe('PersonDatailsComponent', () => {
  let component: PersonDatailsComponent;
  let fixture: ComponentFixture<PersonDatailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonDatailsComponent]
    });
    fixture = TestBed.createComponent(PersonDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
