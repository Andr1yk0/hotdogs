import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotdogsComponent } from './edit-hotdogs.component';

describe('EditHotdogsComponent', () => {
  let component: EditHotdogsComponent;
  let fixture: ComponentFixture<EditHotdogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHotdogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHotdogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
