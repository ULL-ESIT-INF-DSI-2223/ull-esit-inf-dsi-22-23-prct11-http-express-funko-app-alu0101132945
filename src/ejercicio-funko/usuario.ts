import * as fs from 'fs';
import * as path from 'path';
import { Funko } from './funko.js';
import { FunkoPop, ResponseType } from './tipos.js';

export class FunkoUserStorage{
    
    private readonly userDir: string;
    private readonly funkomap: Map<number,Funko> = new Map();
    
    /**
     * constructor de la clase FunkoUserStorage
     * @param user usuario de la aplicacion
     */
    constructor(private readonly user:string){
        
        this.userDir = path.join('./','data',user);
        if(!fs.existsSync(this.userDir)){
            fs.mkdirSync(this.userDir,{recursive:true});
        }
        if(fs.existsSync(this.userDir) && fs.readdirSync(this.userDir).length != 0 && this.funkomap.size == 0){
            this.funkomap = this.funkoUpload();
        }
    }

    /**
     * metodo que carga el map del usuario con los funkos guardados en su directorio
     * @returns el map con los funkos del usuario
     */
    private funkoUpload(): Map<number, Funko> {
        let funkos = new Map<number, Funko>();
          // Verificar si el directorio existe, y crearlo si no existe
            if (!fs.existsSync(this.userDir)) {
                fs.mkdirSync(this.userDir);
            }

            const files = fs.readdirSync(this.userDir);
            files.forEach(file => {
                const filePath = path.join(this.userDir, file);
                const funkofile = fs.readFileSync(filePath,'utf-8')
                const funkodata= JSON.parse(funkofile)
                const funko : Funko = new Funko(funkodata.id,funkodata.name,funkodata.descripcion,funkodata.tipo,funkodata.genero,funkodata.franquicia,funkodata.numero,funkodata.exclusivo,funkodata.especial,funkodata.valor);
                funkos.set(funko.getID(),funko);
                
            });
        return funkos;
    }
    /**
     * metodo que guarda un funko del usuario en el directorio
     * @param funko funko que va a ser guardado
     */
    private funkoSave(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        const funkoData = JSON.stringify(funko,null,2);
        fs.writeFileSync(filePath,funkoData,'utf-8');
    }
    
    /**
     * metodo que borra un fichero json con un funko del directorio del usuario
     * @param funko funko que va a ser borrado
     */
    private funkoDelete(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        fs.unlinkSync(filePath);
    }

    /**
     * metodo que devuelve un funko del map del usuario
     * @param id ID del funko que se va a buscar
     * @returns un funko si lo encuentra o undefined si no esta en el map
     */
    public getFunko(id:number):Funko | undefined{
        return this.funkomap.get(id);
    }

    /**
     * metodo que añade un funko al map del usuario y a su directorio
     * @param funko funko que se va a añadir al usuario
     */
    public addFunko(funko:Funko): ResponseType{
        if(this.funkomap.has(funko.getID())){
            return {
                success: false,
                msg: `El funko con ID ${funko.getID()} ya existe en la lista`
            };
        }else{
            this.funkomap.set(funko.getID(),funko);
            this.funkoSave(funko);
            return {
                success: true,
                msg: `Funko con ID ${funko.getID()} añadido a la lista`
            };
        }
    }

    /**
     * metodo que actualiza los datos de un funko del usuario
     * @param funko funko que va a ser actualizado
     */
    public updateFunko(funko: Funko):ResponseType{
        const id = funko.getID();

        const filedir = path.join(this.userDir,`${this.funkomap.get(id)?.getName()}.json`)
        if(!fs.existsSync(filedir)){
            return {
                success: false,
                msg: `No se encontro ningun funko con ID ${funko.getID()} en la lista`
            }
        }else{
            const funkofile = fs.readFileSync(filedir,'utf-8')
            const funkodata= JSON.parse(funkofile)
            const funko2 : Funko = new Funko(funkodata.id,funkodata.name,funkodata.descripcion,funkodata.tipo,funkodata.genero,funkodata.franquicia,funkodata.numero,funkodata.exclusivo,funkodata.especial,funkodata.valor);
            this.funkoDelete(funko2);
            this.funkomap.delete(funko2.getID())    
            this.funkomap.set(id,funko);
            this.funkoSave(funko);
            return{
            success: true, 
            msg: `funko con ID ${funko.getID()} modificado en la lista`
            };
        }
    }

    /**
     * metodo que borra un funko del map y del directorio del usuario
     * @param id id del funko que va a ser borrado
     */
    public removeFunko(id:number):ResponseType{
        const funko = this.getFunko(id);
        if(funko){
            this.funkomap.delete(id);
            this.funkoDelete(funko);
            return{
            success: true, 
            msg: `funko con ID ${id} eliminado de la lista`
            }
        }else{
            return {
                success: true,
                msg: `No se encontro ningun funko con ID ${id} en la lista`
            }
        }
    }

    /**
     * metodo que devuelve los funkos de un usuario con sus datos
     */
    public listFunko(){
        let result:any[] = [];
        this.funkomap.forEach(funko => {
            result.push(this.showFunko(funko.getID()))
        });
        return result;
    }

    /**
     * metodo que muestra los datos de un funko en concreto
     * @param id id del funko del que se buscan los datos
     */
    public showFunko(id:number): FunkoPop | ResponseType{
        const funko = this.getFunko(id);
        if (funko) {
            const info = {
                id: funko.getID(),
                name: funko.getName(), 
                descripcion: funko.getDesc(),
                tipo: funko.getTipo(),
                genero: funko.getGen(),
                franquicia: funko.getFran(), 
                numero: funko.getNum(),
                exclusivo: funko.getExc(), 
                especial: funko.getEsp(), 
                precio: funko.getVal(),
            }
            return info;
            
        } else {
            return {
                success: false,
                msg: `No se encontró ningún Funko con ID ${id} en la lista.`
            };
        }
    }
    public getMap(){return this.funkomap}
}