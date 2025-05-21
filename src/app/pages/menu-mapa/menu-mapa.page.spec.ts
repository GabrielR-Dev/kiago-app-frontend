import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMapaPage } from './menu-mapa.page';

describe('MenuMapaPage', () => {
  let component: MenuMapaPage;
  let fixture: ComponentFixture<MenuMapaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
