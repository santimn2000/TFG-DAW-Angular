import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCookiesComponent } from './dialog-cookies.component';

describe('DialogCookiesComponent', () => {
  let component: DialogCookiesComponent;
  let fixture: ComponentFixture<DialogCookiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCookiesComponent]
    });
    fixture = TestBed.createComponent(DialogCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
