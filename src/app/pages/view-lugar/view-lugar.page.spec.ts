import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLugarPage } from './view-lugar.page';

describe('ViewLugarPage', () => {
  let component: ViewLugarPage;
  let fixture: ComponentFixture<ViewLugarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLugarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
