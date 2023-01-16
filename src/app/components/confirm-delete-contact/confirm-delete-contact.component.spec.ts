import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteContactComponent } from './confirm-delete-contact.component';

describe('ConfirmDeleteContactComponent', () => {
  let component: ConfirmDeleteContactComponent;
  let fixture: ComponentFixture<ConfirmDeleteContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
