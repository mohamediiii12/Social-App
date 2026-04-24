import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesListComponent } from './likes-list.component';

describe('LikesListComponent', () => {
  let component: LikesListComponent;
  let fixture: ComponentFixture<LikesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
