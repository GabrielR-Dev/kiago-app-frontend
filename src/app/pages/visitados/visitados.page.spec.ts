import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitadosPage } from './visitados.page';

describe('VisitadosPage', () => {
  let component: VisitadosPage;
  let fixture: ComponentFixture<VisitadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
