import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecetaService } from '../../services/receta.service';
import { RecetaRequest } from '../../models/receta';
import { Dificultad } from '../../models/dificultad';

@Component({
  selector: 'app-receta-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './receta-edit-modal.component.html',
  styleUrl: './receta-edit-modal.component.css'
})
export class RecetaEditModalComponent implements OnInit{
dificultades: Dificultad[] = [];
  isLoading = false;
  errorMessage = '';

  receta: RecetaRequest = {
    nombre: '',
    ingredientes: '',
    descripcion: '',
    tiempoPreparacion: 0,
    dificultadId: 0
  };

  constructor(
    private recetaService: RecetaService,
    public dialogRef: MatDialogRef<RecetaEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.recetaService.getAllDificultades().subscribe({
      next: d => this.dificultades = d
    });
    this.receta = { ...this.data.receta };
  }

  editarReceta(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Todos los campos deben estar rellenos para continuar.';
      return;
    }

    this.isLoading = true;

    this.recetaService.updateReceta(this.data.receta.id, this.receta).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: () => {
        this.errorMessage = 'Se ha producido un error al tratar de editar la receta.';
        this.isLoading = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}