import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta, RecetaRequest } from '../models/receta';
import { Dificultad } from '../models/dificultad';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recetas`, {
      headers: this.getHeaders()
    });
  }

  getRecetaById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/recetas/${id}`, {
      headers: this.getHeaders()
    });
  }

  createReceta(receta: RecetaRequest): Observable<Receta> {
    return this.http.post<Receta>(`${this.apiUrl}/recetas`, receta, {
      headers: this.getHeaders()
    });
  }

  updateReceta(id: number, receta: RecetaRequest): Observable<Receta> {
  return this.http.put<Receta>(`${this.apiUrl}/recetas/${id}`, receta, {
    headers: this.getHeaders()
  });
}

  deleteReceta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recetas/${id}`, {
      headers: this.getHeaders()
    });
  }

  getAllDificultades(): Observable<Dificultad[]> {
    return this.http.get<Dificultad[]>(`${this.apiUrl}/dificultades`, {
      headers: this.getHeaders()
    });
  }
}