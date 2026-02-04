import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NephraFormComponent } from './nephra-form.component';

describe('NephraFormComponent', () => {
  let component: NephraFormComponent;
  let fixture: ComponentFixture<NephraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NephraFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NephraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
