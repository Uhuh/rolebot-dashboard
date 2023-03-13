import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactRoleCreateComponent } from './react-role-create.component';

describe('ReactRoleCreateComponent', () => {
  let component: ReactRoleCreateComponent;
  let fixture: ComponentFixture<ReactRoleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactRoleCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactRoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
