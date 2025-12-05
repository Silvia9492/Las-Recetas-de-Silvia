import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaFormModalComponent } from './receta-form-modal.component';

describe('RecetaFormModalComponent', () => {
  let component: RecetaFormModalComponent;
  let fixture: ComponentFixture<RecetaFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
