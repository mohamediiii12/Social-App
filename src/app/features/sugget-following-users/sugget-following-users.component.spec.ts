import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggetFollowingUsersComponent } from './sugget-following-users.component';

describe('SuggetFollowingUsersComponent', () => {
  let component: SuggetFollowingUsersComponent;
  let fixture: ComponentFixture<SuggetFollowingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggetFollowingUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggetFollowingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
