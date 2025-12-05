import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaDeleteModalComponent } from './receta-delete-modal.component';

describe('RecetaDeleteModalComponent', () => {
  let component: RecetaDeleteModalComponent;
  let fixture: ComponentFixture<RecetaDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
