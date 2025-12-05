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
import { RecetaRequest, Receta } from '../../models/receta';
import { Dificultad } from '../../models/dificultad';

@Component({
  selector: 'app-receta-form-modal',
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
  templateUrl: './receta-form-modal.component.html',
  styleUrl: './receta-form-modal.component.css'
})
export class RecetaFormModalComponent implements OnInit {
  dificultades: Dificultad[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  receta: RecetaRequest = {
    nombre: '',
    ingredientes: '',
    descripcion: '',
    tiempoPreparacion: 0,
    dificultadId: 0
  };

  constructor(
    private recetaService: RecetaService,
    public dialogRef: MatDialogRef<RecetaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.recetaService.getAllDificultades().subscribe({
      next: (data) => this.dificultades = data,
      error: () => this.errorMessage = 'Se ha producido un error tratando de cargar la dificultad.'
    });
  }

  crearReceta(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = "Todos los campos deben estar rellenos para poder crear una nueva receta.";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.recetaService.createReceta(this.receta).subscribe({
      next: (res: Receta) => {
        this.dialogRef.close(res);
      },
      error: () => {
        this.errorMessage = "No se ha podido crear la nueva receta.";
        this.isLoading = false;
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}