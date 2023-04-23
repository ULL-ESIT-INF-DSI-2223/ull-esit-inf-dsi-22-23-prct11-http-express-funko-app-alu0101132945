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
    /**
     * definicion del metodo getID
     */
    getID():number;
    /**
     * definicion del metodo getName
     */
    getName():string;
    /**
     * definicion del metodo getDesc
     */
    getDesc():string;
    /**
     * definicion del metodo getTip
     */
    getTipo():FunkoTipo;
    /**
     * definicion del metodo getGen
     */
    getGen():FunkoGen;
    /**
     * definicion del metodo getFran
     */
    getFran():string;
    /**
     * definicion del metodo getNum
     */
    getNum():number;
    /**
     * definicion del metodo getExc
     */
    getExc():boolean;
    /**
     * definicion del metodo getEsp
     */
    getEsp():string;
    /**
     * definicion del metodo getVal
     */
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
    /**
     * constructor de la clase funko
     * @param id identificador unico del funko
     * @param name nombre del funko
     * @param descripcion descripcion del funko
     * @param tipo tipo del funko descrito en el enum FunkoTipo
     * @param genero genero del funko definido en el enum FunkoGen
     * @param franquicia franquicia a la que pertenece el funko
     * @param numero numero del funko
     * @param exclusivo booleano que indica si el funko es exclusivo
     * @param especial string que contiene si el funko tiene alguna caracteristica especial
     * @param valor valor economico del funko
     */
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
    /**
     * getter del id
     * @returns el id del funko
     */
    getID(){return this.id}
    /**
     * getter del name
     * @returns el nombre del funko
     */
    getName(){return this.name}
    /**
     * getter de la descripcion
     * @returns la descripcion del funko
     */
    getDesc(){return this.descripcion}
    /**
     * getter del tipo
     * @returns el tipo del funko
     */
    getTipo(){return FunkoTipo[this.tipo as keyof typeof FunkoTipo];}
    /**
     * getter del genero
     * @returns el genero del funko
     */
    getGen(){return FunkoGen[this.genero as keyof typeof FunkoGen];}
    /**
     * getter de la franquicia
     * @returns franquicia del funko
     */
    getFran(){return this.franquicia}
    /**
     * getter del numero
     * @returns el numero del funko
     */
    getNum(){return this.numero}
    /**
     * getter de exclusivo
     * @returns si el funko es exclusivo
     */
    getExc(){return this.exclusivo}
    /**
     * getter del especial
     * @returns caracteristicas especiales del funko
     */
    getEsp(){return this.especial}
    /**
     * getter del valor
     * @returns el valor economico del funko
     */
    getVal(){return this.valor}
    
}