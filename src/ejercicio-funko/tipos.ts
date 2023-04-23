import { Funko } from "./funko.js";

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

export type ResponseType = {
    success: boolean;
    msg?: string;
    
}