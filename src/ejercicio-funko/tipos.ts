/**
 * tipo de respuesta para devolver un funko
 */
export type FunkoPop = {
    id : number;
    name: string;
    descripcion: string;
    tipo: string;
    genero: string;
    franquicia: string;
    numero: number;
    exclusivo: boolean;
    especial: string;
    precio : number;
}

/**
 * tipo de respuesta con un mensaje de respuesta
 */
export type ResponseType = {
    success: boolean;
    msg?: string;
    
}