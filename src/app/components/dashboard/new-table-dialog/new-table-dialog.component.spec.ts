import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableDialogComponent } from './new-table-dialog.component';

describe('NewTableDialogComponent', () => {
  let component: NewTableDialogComponent;
  let fixture: ComponentFixture<NewTableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
