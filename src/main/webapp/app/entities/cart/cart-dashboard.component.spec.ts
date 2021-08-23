import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDashboardComponent } from './cart-dashboard.component';

describe('CartDashboardComponent', () => {
  let component: CartDashboardComponent;
  let fixture: ComponentFixture<CartDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
