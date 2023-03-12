import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactRoleComponent } from './react-role.component';

describe('ReactRoleComponent', () => {
  let component: ReactRoleComponent;
  let fixture: ComponentFixture<ReactRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
