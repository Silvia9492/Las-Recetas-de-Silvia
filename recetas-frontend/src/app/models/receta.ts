export interface Receta {
    id?: number;
    nombre: string;
    ingredientes: string;
    descripcion: string;
    tiempoPreparacion: number;
    dificultad?: 'Fácil' | 'Normal' | 'Difícil';
    dificultadId: number;
    usuarioNombre?: string;
    fechaCreacion?: string;
}

export interface RecetaRequest {
    nombre: string;
    ingredientes: string;
    descripcion: string;
    tiempoPreparacion: number;
    dificultadId: number;
}