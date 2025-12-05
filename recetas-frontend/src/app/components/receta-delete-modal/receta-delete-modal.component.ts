import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecetaService } from '../../services/receta.service';

@Component({
  selector: 'app-receta-delete-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './receta-delete-modal.component.html',
  styleUrl: './receta-delete-modal.component.css'
})
export class RecetaDeleteModalComponent {
constructor(
    private recetaService: RecetaService,
    public dialogRef: MatDialogRef<RecetaDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar() {
    this.dialogRef.close(false);
  }

  borrar() {
    this.recetaService.deleteReceta(this.data.receta.id).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false)
    });
  }
}