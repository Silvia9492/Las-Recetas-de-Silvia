import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationService } from '../../services/authentication.service';
import { RecetaFormModalComponent } from '../receta-form-modal/receta-form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Receta } from '../../models/receta';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() username: string | null = null;
  @Input() recetas: Receta[] = [];
  @Output() nuevaReceta = new EventEmitter<Receta>();
  @Output() recetaActualizada = new EventEmitter<Receta>();
  @Output() recetaEliminada = new EventEmitter<number>();

  constructor(private router: Router,
    private authService: AuthenticationService,
    private dialog: MatDialog) {}

  insertarReceta() {
    const dialogRef = this.dialog.open(RecetaFormModalComponent, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe(nuevaRecetaCreada => {
    if (nuevaRecetaCreada) {
      this.nuevaReceta.emit(nuevaRecetaCreada);
    }
  });
  }

  logout() {
    this.authService.logout();
  }
}