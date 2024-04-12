import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisProductosComponent } from './mis-productos.component';

describe('MisProductosComponent', () => {
  let component: MisProductosComponent;
  let fixture: ComponentFixture<MisProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisProductosComponent]
    });
    fixture = TestBed.createComponent(MisProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
