import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaProductosComponent } from './pantalla-productos.component';

describe('PantallaProductosComponent', () => {
  let component: PantallaProductosComponent;
  let fixture: ComponentFixture<PantallaProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantallaProductosComponent]
    });
    fixture = TestBed.createComponent(PantallaProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
