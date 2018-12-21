import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandiListComponent } from './candi-list.component';

describe('CandiListComponent', () => {
  let component: CandiListComponent;
  let fixture: ComponentFixture<CandiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
