[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101132945/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101132945?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101132945&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101132945)

# Practica 11

En esta práctica, tendrá que basarse en las implementaciones de la aplicación de registro de Funko Pops que ha llevado a cabo en prácticas pasadas, con el objetivo de que la funcionalidad de dicha aplicación se implemente a través de un servidor HTTP escrito con Express. Desde un cliente como, por ejemplo, ThunderClient o Postman, se podrán llevar a cabo peticiones HTTP al servidor. Las peticiones que podrá realizar el cliente al servidor deberán permitir añadir, modificar, eliminar, listar y mostrar los Funko Pops de un usuario concreto. El servidor Express deberá almacenar la información de los Funko Pops como ficheros JSON en el sistema de ficheros, siguiendo la misma estructura de directorios utilizada durante prácticas pasadas.

Tendrá que comentar en un informe sus soluciones, haciendo hincapié en las decisiones de diseño que ha tomado.

## Descripción de los requisitos

En concreto, un Funko vendrá descrito por los siguientes elementos mínimos de información que deberán ser almacenados:

- ID. Debe ser un identificador único del Funko.
- Nombre. Debe ser una cadena de caracteres.
- Descripción. Debe ser una cadena de caracteres.
- Tipo. Debe ser un enumerado con valores como, por ejemplo, Pop!, Pop! Rides, Vynil Soda o Vynil Gold, entre otros.
- Género. Debe ser un enumerado con valores como, por ejemplo, Animación, Películas y TV, Videojuegos, Deportes, Música o Ánime, entre otras.
- Franquicia. Debe ser una cadena de caracteres como, por ejemplo, The Big Bang Theory, Game of Thrones, Sonic The Hedgehog o Marvel: Guardians of the Galaxy, entre otras.
- Número. Debe ser el número identificativo del Funko dentro de la franquicia correspondiente.
- Exclusivo. Debe ser un valor booleano, esto es, verdadero en el caso de que el Funko sea exclusivo o falso en caso contrario.
- Características especiales. Debe ser una cadena de caracteres que indique las característica especiales del Funko como, por ejemplo, si brilla en la oscuridad o si su cabeza balancea.
- Valor de mercado. Debe ser un valor numérico positivo.

En este caso la clase __Funko__ se mantiene igual que en las practicas anteriores ya que las funcionalidades implementadas son suficientes para lo que se pide

### funko.ts
```typescript
export enum FunkoTipo {
    p  = 'Pop!',
    pr = 'Pop! Rides',
    vs = 'Vynil Soda',
    vg = 'Vynil Gold',
    pc = 'Pop! Chrome'
}

export enum FunkoGen{
    a  = 'Animacion',
    pt = 'Peliculas y TV',
    v  = 'Videojuegos',
    d  = 'Deportes',
    m  = 'Musica',
}

interface FunkoPOP{
    getID():number;
    getName():string;
    getDesc():string;
    getTipo():FunkoTipo;
    getGen():FunkoGen;
    getFran():string;
    getNum():number;
    getExc():boolean;
    getEsp():string;
    getVal():number;
}

export class Funko implements FunkoPOP{
    private id;
    private name;
    private descripcion;
    private tipo;
    private genero;
    private franquicia;
    private numero;
    private exclusivo;
    private especial;
    private valor;
    constructor(id:number,name:string,descripcion:string,tipo:string,genero:string,franquicia:string,numero:number, exclusivo:boolean,especial:string,valor:number){
        this.id = id;
        name = name.replace(/ /g,'_');
        this.name = name;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.genero = genero;
        this.franquicia = franquicia;
        this.numero = numero;
        this.exclusivo = exclusivo;
        this.especial = especial;
        this.valor = valor;
    }
    getID(){return this.id}
    getName(){return this.name}
    getDesc(){return this.descripcion}
    getTipo(){return FunkoTipo[this.tipo as keyof typeof FunkoTipo];}
    getGen(){return FunkoGen[this.genero as keyof typeof FunkoGen];}
    getFran(){return this.franquicia}
    getNum(){return this.numero}
    getExc(){return this.exclusivo}
    getEsp(){return this.especial}
    getVal(){return this.valor}
    
}
```

Cada usuario tendrá su propia lista de _Funko Pops_, sobre la cual se podrán llevar a cabo las siguientes operaciones:

- __Añadir__ un Funko a la lista. Antes de añadir un Funko a la lista se debe comprobar si ya existe un Funko con el mismo ID. En caso de que así fuera, deberá devolverse al cliente un mensaje de error en formato JSON. En caso contrario, se añadirá el nuevo Funko a la lista y se devolverá al cliente un mensaje de operación satisfactoria en formato JSON.

- __Modificar__ un Funko de la lista. Antes de modificar un Funko, previamente se debe comprobar si ya existe un Funko con el ID del Funko a modificar en la lista. Si existe, se procede a su modificación y se envía al cliente un mensaje de operación satisfactoria en formato JSON. En caso contrario, deberá enviarse al cliente un mensaje de error en formato JSON.

- __Eliminar__ un Funko de la lista. Antes de eliminar un Funko, previamente se debe comprobar si existe un Funko con el ID del Funko a eliminar en la lista. Si existe, se procede a su eliminación y se envía de vuelta al cliente un mensaje de operación satisfactoria en formato JSON. En caso contrario, deberá enviarse al cliente un mensaje de error en formato JSON.

- __Listar__ los Funkos existentes en una lista. En este caso, se enviará de vuelta al cliente, en formato JSON, toda la información de cada Funko existente en la lista.

- __Mostrar__ la información de un Funko concreto existente en la lista. Antes de mostrar la información del Funko, se debe comprobar que en la lista existe un Funko cuyo ID sea el del Funko a mostrar. Si existe, se enviará al cliente toda su información en formato JSON. En caso contrario, se le enviará al cliente un mensaje de error en formato JSON.

En este caso la clase __FunkoUserStorage__ ha cambiado lo que devuelven sus metodos para devolver los JSON que devolvera el server, usando los tipos que estan en el enunciado de la practica modificados para ser compatibles con lo implementado anteriormente:

### tipos.ts
```typescript
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
```

### usuario.ts
```typescript
export class FunkoUserStorage{   
    private readonly userDir: string;
    private readonly funkomap: Map<number,Funko> = new Map();
    constructor(private readonly user:string){    
        this.userDir = path.join('./','data',user);
        if(!fs.existsSync(this.userDir)){
            fs.mkdirSync(this.userDir,{recursive:true});
        }
        if(fs.existsSync(this.userDir) && fs.readdirSync(this.userDir).length != 0 && this.funkomap.size == 0){
            this.funkomap = this.funkoUpload();
        }
    }
    private funkoUpload(): Map<number, Funko> {
        let funkos = new Map<number, Funko>();
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
    private funkoSave(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        const funkoData = JSON.stringify(funko,null,2);
        fs.writeFileSync(filePath,funkoData,'utf-8');
    }
    private funkoDelete(funko:Funko):void{
        const filePath = path.join(this.userDir,`${funko.getName()}.json`);
        fs.unlinkSync(filePath);
    }
    public getFunko(id:number):Funko | undefined{
        return this.funkomap.get(id);
    }
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
    public listFunko(){
        let result:any[] = [];
        this.funkomap.forEach(funko => {
            result.push(this.showFunko(funko.getID()))
        });
        return result;
    }
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
```

con esto la clase _FunkoUserStorage_ podrá ser utilizada por el servidor correctamente y podra responder correctamente a las peticiones que se realicen al servidor.

El servidor es responsable de hacer persistente la lista de Funko Pops de cada usuario. Para ello, deberá guardar cada Funko Pop de la lista en un fichero con formato JSON. Los ficheros JSON correspondientes a los Funko Pops de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.

Por último, las peticiones al servidor se tendrán que hacer a través de un cliente HTTP como, por ejemplo, ThunderClient o Postman.

El servidor puede realizar todo esto gracias a que utiliza la clase _FunkouserStorage_ en cada una de las peticiones que implementa, ademas se ha seguido los consejos de implementacion para el servidor:

* Todas las peticiones HTTP deberán hacerse a partir de la ruta /funkos.

* Deberá usar los siguientes verbos HTTP para definir la manera en la que el servidor debe procesar cada tipo de petición:

    + get: Para obtener información sobre un Funko Pop concreto de un usuario o para listar todos sus Funko Pops.
    + post: Para añadir un Funko Pop a la lista de un usuario.
    + delete: Para eliminar un Funko Pop de la lista de un usuario.
    + patch: Para modificar la información de un Funko Pop existente en la lista de un usuario.

y siguiendo esta guia se hace la siguiente implementacion del servidor:

### server.ts
```typescript
const app = express();
app.get('/funkos',(req,res) => {
    if(!req.query.id){
        if(!req.query.username){   
            const resp : ResponseType = {
                success: false,
                msg : 'No se ha enviado un usuario para obtener la lista' 
            } 
            res.json(resp);
        } else{
            const user = new FunkoUserStorage(req.query.username as string);
            const lista = user.listFunko()
            res.json(lista);
        }
    }else {
        if(!req.query.username){  
            const resp : ResponseType = {
                success: false,
                msg : 'No se ha enviado un usuario para obtener la lista' 
            }   
            res.send(resp);
        } else{
            const user = new FunkoUserStorage(req.query.username as string);
            const lista = user.showFunko(Number(req.query.id as string))
            res.json(lista);
        }
    }
})
app.post('/funkos', (req,res) => {
    if(!req.query.username){
        const resp : ResponseType = {
            success: false,
            msg : 'No se ha enviado un usuario para obtener la lista' 
        }
        res.json(resp);
    } else{
        if(!req.query.id || !req.query.name || !req.query.desc || !req.query.tipo || !req.query.gen || !req.query.franq || !req.query.num || !req.query.excl || !req.query.esp || !req.query.val){
            const resp : ResponseType = {
                success: false,
                msg : 'No se ha enviado un funko valido para incluirlo en la lista' 
            }
            res.json(resp)
        }
        else{
            const user = new FunkoUserStorage(req.query.username as string);
            const exclusivo = req.query.excl === "true";   
            const fun = new Funko(Number(req.query.id as string), req.query.name as string, req.query.desc as string, req.query.tipo as string, req.query.gen as string, req.query.franq as string, Number(req.query.num as string), exclusivo, req.query.esp as string, Number(req.query.val as string));
            const result = user.addFunko(fun);
            res.json(result);
        }
    }
});
app.patch('/funkos',(req, res) => {
    if(!req.query.username){
        const resp : ResponseType = {
            success: false,
            msg : 'No se ha enviado un usuario para obtener la lista' 
        }
        res.json(resp);
    } else{
        if(!req.query.id || !req.query.name || !req.query.desc || !req.query.tipo || !req.query.gen || !req.query.franq || !req.query.num || !req.query.excl || !req.query.esp || !req.query.val){
            const resp : ResponseType = {
                success: false,
                msg : 'No se ha enviado un funko valido para actualizarlo en la lista' 
            }
            res.json(resp)
        }
        else{
            const user = new FunkoUserStorage(req.query.username as string);
            const exclusivo = req.query.excl === "true";   
            const fun = new Funko(Number(req.query.id as string), req.query.name as string, req.query.desc as string, req.query.tipo as string, req.query.gen as string, req.query.franq as string, Number(req.query.num as string), exclusivo, req.query.esp as string, Number(req.query.val as string));
            const result = user.updateFunko(fun);
            res.json(result);
        }
    }
})
app.delete('/funkos', (req, res) => {
    if(!req.query.username){
        const resp : ResponseType = {
            success: false,
            msg : 'No se ha enviado un usuario para obtener la lista' 
        }
        res.json(resp);
    } else{
        if(!req.query.id){
            const resp : ResponseType = {
                success: false,
                msg : 'No se ha enviado un id valido para borrar un funko de la lista' 
            }
            res.json(resp)
        }
        else{
            const user = new FunkoUserStorage(req.query.username as string)
            const result = user.removeFunko(Number(req.query.id as string))
            res.json(result);
        }
    }
})
app.get('*',(_,res) =>{
    res.send({
        error : 404
        })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
```

y con esto ya tendriamos el servidor montado para que un cliente,por ejemplo ThunderClient, le hicieses las peticiones indicadas y le devolviese la informacion que le pide de manera correcta.