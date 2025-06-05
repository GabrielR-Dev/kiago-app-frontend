import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IrPage } from './ir.page';

describe('IrPage', () => {
  let component: IrPage;
  let fixture: ComponentFixture<IrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
