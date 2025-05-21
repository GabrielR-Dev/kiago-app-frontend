import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenumenuPage } from './menumenu.page';

describe('MenumenuPage', () => {
  let component: MenumenuPage;
  let fixture: ComponentFixture<MenumenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
