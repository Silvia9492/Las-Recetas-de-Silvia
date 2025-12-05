import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEditModalComponent } from './receta-edit-modal.component';

describe('RecetaEditModalComponent', () => {
  let component: RecetaEditModalComponent;
  let fixture: ComponentFixture<RecetaEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
