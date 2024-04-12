import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProdsComponent } from './lista-prods.component';

describe('ListaProdsComponent', () => {
  let component: ListaProdsComponent;
  let fixture: ComponentFixture<ListaProdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProdsComponent]
    });
    fixture = TestBed.createComponent(ListaProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
