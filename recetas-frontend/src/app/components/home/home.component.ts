import { Component, OnInit } from '@angular/core';
import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { Usuario } from '../../models/usuario';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecetaEditModalComponent } from '../receta-edit-modal/receta-edit-modal.component';
import { RecetaDeleteModalComponent } from '../receta-delete-modal/receta-delete-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    MatIconModule, 
    MatDialogModule,
    MatTooltipModule,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  recetas: Receta[] = [];
  currentUser: Usuario | null = null;
  isLoading: boolean = true;

  constructor(
    private recetaService: RecetaService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser$.subscribe(user => {
      this.currentUser = user ?? null;
    });
    this.loadRecetas();
  }

  loadRecetas(): void {
    this.isLoading = true;
    this.recetaService.getAllRecetas().subscribe({
      next: (data) => {
        this.recetas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Se ha producido un error mientras se trataban de cargar las recetas.', err);
        this.isLoading = false;
      }
    });
  }

  agregarReceta(receta: Receta): void {
    this.recetas.unshift(receta);
  }

  actualizarReceta(recetaActualizada: Receta): void {
    const index = this.recetas.findIndex(r => r.id === recetaActualizada.id);
    if (index !== -1) {
      this.recetas[index] = recetaActualizada;
    }
  }

  eliminarRecetaPorId(id: number): void {
    this.recetas = this.recetas.filter(r => r.id !== id);
  }

  editarReceta(receta: Receta): void {
    const dialogRef = this.dialog.open(RecetaEditModalComponent, {
      width: '600px',
      data: { receta }
    });

    dialogRef.afterClosed().subscribe((recetaModificada: Receta) => {
      if (recetaModificada) {
        this.actualizarReceta(recetaModificada);
      }
    });
  }

  eliminarReceta(receta: Receta): void {
    const dialogRef = this.dialog.open(RecetaDeleteModalComponent, {
      width: '400px',
      data: { receta }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && receta.id) {
        this.recetaService.deleteReceta(receta.id).subscribe({
          next: () => {
            this.recetas = this.recetas.filter(r => r.id !== receta.id);
          },
          error: (err) => {
            console.error('Se ha producido un error al tratar de eliminar la receta', err);
          }
        });
      }
    });
  }
}