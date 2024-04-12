import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductoFormComponent } from './add-producto-form.component';

describe('AddProductoFormComponent', () => {
  let component: AddProductoFormComponent;
  let fixture: ComponentFixture<AddProductoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductoFormComponent]
    });
    fixture = TestBed.createComponent(AddProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
