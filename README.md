[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101132945&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101132945)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101132945/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101132945)
# Práctica 10 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js

En esta práctica, se plantean algunos ejercicios que deberá resolver haciendo uso de las APIs asíncronas de gestión del sistema de ficheros (módulo fs), de creación de procesos (módulo child_process) y de creación de sockets (módulo net) de Node.js.

## Ejercicio 1

Ejercicio 1
Considere el siguiente ejemplo de código fuente TypeScript que hace uso del módulo fs de Node.js:
```Typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
En primer lugar, ejecute el programa para tratar de comprender qué hace.

A continuación, realice una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo, dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. ¿Qué hace la función access? ¿Para qué sirve el objeto constants?

Para llevar a cabo este ejercicio, se recomienda repasar el comportamiento del bucle de eventos de Node.js haciendo uso, por ejemplo, del siguiente recurso.

Para este ejercicio primero haremos la traza, despues explicaremos para que sirve la funcion access y por ultimo explicaremos para que sirve el objeto constants.

En primer lugar tenemos la traza de ejecucion, simplificaremos los nombres de los elementos implicados en esta traza de la siguiente forma:

- Pila de llamadas: __PL__
- Registros de eventos de la API: __RE__
- Cola de manejadores: __CM__
- Salida por consola: __SC__

una vez definido esto, pasemos a realizar la traza con dos modificaciones al fichero helloworld.txt:

-----------------------------

+ 1º:

PL:
- main()

RE:
- vacio

CM:
- vacio

SC:
- Please, specify a file

-----------------------------

+ 2º:

PL:
- main()

RE:
- access()

CM:
- vacio

SC:
- vacio

-----------------------------

 + 3º:

PL:
- access()

RE:
- vacio

CM:
- manejador de access()

SC:
- vacio

-----------------------------

+ 4º:

PL:
- manejador de access()

RE:
- vacio

CM:
- vacio

SC:
- Starting to watch file helloworld.txt

-----------------------------

+ 5º:

PL:
- watcher.on()

RE:
- cambio en el observador del archivo

CM:
- vacio

SC:
- vacio

-----------------------------

+ 6º:

PL:
- vacio

RE:
- vacio

CM:
- manejador de change()

SC:
- vacio

-----------------------------

+ 7º:

PL:
- manejador de change()

RE:
- vacio

CM:
- vacio

SC:
- 'File helloworld.txt has been modified somehow'

-----------------------------

+ 8º:

PL:
- watcher.on()

RE:
- manejador de change()

CM:
- vacio

SC:
- vacio

-----------------------------

+ 9º:

PL:
- vacio

RE:
- vacio

CM:
- manejador de change()

SC:
- vacio

-----------------------------

+ 10º:

PL:
- manejador de change()

RE:
- vacio

CM:
- vacio

SC:
- 'File helloworld.txt has been modified somehow'

-----------------------------


+ 11º:

PL:
- watcher.on()

RE:## Ejercicio 2

Escriba una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado a la aplicación desde la línea de comandos. Adicionalmente, también deberá indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs.

Lleve a cabo el ejercicio anterior de dos maneras diferentes:

Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.
Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucedería si indica desde la línea de comandos un fichero que no existe o una opción no válida?

- access()

CM:
- vacio

SC:
- vacio

-----------------------------

+ 12º:

PL:
- access()

RE:
- vacio

CM:
- manejador de access()

SC:
- vacio

-----------------------------

+ 13º:

PL:
- manejador de access()

RE:
- vacio

CM:
- vacio

SC:
- 'File helloworld.txt is no longer watched'

-----------------------------

+ 14º:

PL:
- main()

RE:
- vacio

CM:
- vacio

SC:
- vacio

-----------------------------

y con esto acabaria el programa y tambien la traza, a continuacion se explicaran la funcion _access_ y el objeto _constants_:

- __access__ es una funcion que nos permite comprobar si un fichero se puede acceder con los permisos especificados, a esta funcion se le debe pasar el nombre del archivo al que se quiere acceder y una constante(que en el caso del codigo del ejercicio es constants.F_OK, que se utiliza para verificar la existencia de un archivo).

- __constants__ es un enum, un objeto, que contienen los valores de un flag en particular usado en fs. En el caso del ejercicio se utiliza, como ya se ha indicado anteriormente, constants.F_OK que indica si un archivo existe, pero tambien se puede utilizar otros valores *W_OK*,*R_OK* o *X_OK* que indican si un archivo se puede escribir, leer o ejecutar respectivamente.

## Ejercicio 2

Escriba una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado a la aplicación desde la línea de comandos. Adicionalmente, también deberá indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. Puede gestionar el paso de parámetros desde la línea de comandos haciendo uso de yargs.

Lleve a cabo el ejercicio anterior de dos maneras diferentes:

Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando hacia otro.
Sin hacer uso del método pipe, solamente creando los subprocesos necesarios y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.
Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucedería si indica desde la línea de comandos un fichero que no existe o una opción no válida?

para este ejercicio se ha creado una clase que hace el conteo segun se especifique(lineas, palabras o caracteres) y lo guarda en una valriable de la clase que luego se puede acceder para obtener el valor esperado.

### Readfiles
```typescript
export class ReadFile{
    numOf: number = 0;
    constructor(filename:string, option:string){
        if (!fs.existsSync(filename)) {
            console.error(`Error: File '${filename}' does not exist`);
            return;
        }
        try{
            const data = fs.readFileSync(filename,'utf-8')

            if(option == 'lines'){
                this.countLines(data);
            }
            else if(option == 'words'){
                this.countWords(data);
            }
            else if(option == 'chars'){
                this.countChars(data);
            }
        }catch(error){
            console.error(`Error al leer el fichero ${filename}: ${error}`)
        }
    }
    countLines(data:string){
        this.numOf = data.split('\n').length;
    }
    countWords(data:string){
        this.numOf = data.split(/\s+/).length;
    }
    countChars(data:string){
        this.numOf = data.length;
    }
}
```

esta clase es la que luego se usa para interactuar con el usuario a traves del paquete yargs en el fichero readfileapp

### ReadFileApp

```typescript
yargs(hideBin(process.argv))
    .command('l', 'leer las lineas', {
    filename: {
    description: 'lee las lineas de un fichero',
    type: 'string',
    demandOption: true
    }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'lines')
        console.log(`Lineas del fichero: ${rf.numOf}`)
    })

    .command('w', 'leer las palabras', {
        filename: {
            description: 'lee las palabras de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'words')
        console.log(`Palabras del fichero: ${rf.numOf}`)
    })

    .command('c', 'leer los caracteres', {
        filename: {
            description: 'lee los caracteres de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        const rf : ReadFile = new ReadFile(argv.filename,'chars')
        console.log(`Caracteres del fichero: ${rf.numOf}`)

    })

.help()
.argv
```

para el caso de usar el metodo pipe el codigo utilizado sera distinto al mostrado anteriormente:

### ReadFilePipe

```typescript
yargs(hideBin(process.argv))
    .command('l', 'leer las lineas', {
    filename: {
    description: 'lee las lineas de un fichero',
    type: 'string',
    demandOption: true
    }
    }, (argv) => {
        let contLin = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' }); 
        readStream.on('data', (chunk : string) => {
            contLin += chunk.split('\n').length - 1
        });
        let result = `Lineas del fichero: ${contLin}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

    .command('w', 'leer las palabras', {
        filename: {
            description: 'lee las palabras de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {     
        let contPal = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' }); 
        readStream.on('data',(chunk : string) => {
            const words = chunk.split(/\s+/).filter((word) => word);
            contPal += words.length;
        });
        let result = `Palabras del fichero: ${contPal}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

    .command('c', 'leer los caracteres', {
        filename: {
            description: 'lee los caracteres de un fichero',
            type: 'string',
            demandOption: true
            }
    }, (argv) => {
        let contCar = 0;
        const readStream = fs.createReadStream(argv.filename, { encoding: 'utf-8' });
        readStream.on('data', (chunk) => {
            contCar += chunk.length;
        });
        let result = `Palabras del fichero: ${contCar}\n`
        process.stdout.write(result);
        process.stdin.resume();
    })

.help()
.argv
```

En este caso para simplificar el codigo, la logica se hace dentro de las opciones del yarg.

## Ejercicio 3

En este ejercicio tendrá que partir de la implementación de la aplicación de registro de Funko Pops que llevó a cabo en la Práctica 9 para escribir un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js. Las operaciones que podrá solicitar el cliente al servidor deberán ser las mismas que ya implementó durante la Práctica 9, esto es, añadir, modificar, eliminar, listar y mostrar Funko Pops de un usuario concreto. Un usuario interactuará con el cliente de la aplicación, exclusivamente, a través de la línea de comandos. Al mismo tiempo, en el servidor, la información de los Funko Pops se almacenará en ficheros JSON en el sistema de ficheros, siguiendo la misma estructura de directorios utilizada durante la Práctica 9.

En este caso se mantiene la misma estructura que se aplico en la practica anterior pero ademas se implementa una logica de cliente-servidor usando el modulo net que le envia las peticiones del usuario al servidor que usara la clase FunkoUserStorage para gestionarla y enviarle una respuesta apropiada.

### Servidor
```typescript
function gestRequest(peticion: RequestType): ResponseType {
    const user = new FunkoUserStorage(peticion.username);
    switch (peticion.type) {
        case 'add':
            if(peticion.funkoPop){
            const add = user.addFunko(peticion.funkoPop);
            return { type: 'add', success: true , successmsg: add};
            }else{
                return { type: 'add', success: false};
            }
        case 'update':
            if(peticion.funkoPop){
                const update = user.updateFunko(peticion.funkoPop);
                return { type: 'update', success: true , successmsg: update};
            }else{
                return { type: 'update', success: false};
            }
        case 'remove':
            if(peticion.id){
                const remove = user.removeFunko(peticion.id);
                return { type: 'remove', success: true , successmsg: remove};
            }else{
                return { type: 'remove', success: false};
            }
        case 'read':
            if(peticion.id){
                const funko = user.showFunko(peticion.id);
                return { type: 'read', success: true , successmsg: funko};
            }else{
                return { type: 'read', success: false};
            }
        case 'list':
                const funko = user.listFunko();
                if(funko.length == 0){return { type: 'read', success: false};}
                else{
                return { type: 'read', success: true , successmsg: funko};
                }
        default:
        return { type: 'unknown', success: false };
    }
}

const server = net.createServer();

server.on('connection', (socket) => {
    console.log(`Un cliente se ha conectado: ${socket.remoteAddress}:${socket.remotePort}`);

    let buffer = Buffer.alloc(0);
    let longitudMensaje = -1;

    socket.on('request', (request:RequestType) => {
        socket.emit('response',gestRequest(request))
    });

    socket.on('end', () => {
        console.log(`Un cliente se ha desconectado: ${socket.remoteAddress}:${socket.remotePort}`);
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
```

### Cliente
```typescript
const socket = new net.Socket();

socket.connect(3000, 'localhost', () => {
    console.log('Te has conectado al servidor');
});

yargs(hideBin(process.argv))
    .command('add', 'Añadir un funko', {
    user: {
    description: 'Nombre de usuario',
    type: 'string',
    demandOption: true
    },
    id: {
    description: 'Funko ID',
    type: 'number',
    demandOption: true
    },
    name: {
        description: 'Funko Nombre',
        type: 'string',
        demandOption: true
    },
    desc: {
        description: 'Funko Descripcion',
        type: 'string',
        demandOption: true
    },
    type: {
        description: 'Funko Tipo',
        type: 'string',
        demandOption: true
    },
    gener: {
        description: 'Funko Genero',
        type: 'string',
        demandOption: true
    },
    franq: {
        description: 'Funko Franquicia',
        type: 'string',
        demandOption: true
    },
    num: {
        description: 'Funko Número Franquicia',
        type: 'number',
        demandOption: true
    },
    excl: {
        description: 'Funko Exclusivo',
        type: 'boolean',
        demandOption: true
    },
    esp: {
        description: 'Funko Caractericticas Especiales',
        type: 'string',
        demandOption: true
    },
    val: {
        description: 'Funko Valor Mercado',
        type: 'number',
        demandOption: true
    }

    }, (argv) => {
        const funko =new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val);
        const request:RequestType = {
            type:'add',
            username: argv.user,
            funkoPop: funko
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('update', 'actualiza un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
        name: {
            description: 'Funko Nombre',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'Funko Descripcion',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Funko Tipo',
            type: 'string',
            demandOption: true
        },
        gener: {
            description: 'Funko Genero',
            type: 'string',
            demandOption: true
        },
        franq: {
            description: 'Funko Franquicia',
            type: 'string',
            demandOption: true
        },
        num: {
            description: 'Funko Número Franquicia',
            type: 'number',
            demandOption: true
        },
        excl: {
            description: 'Funko Exclusivo',
            type: 'boolean',
            demandOption: true
        },
        esp: {
            description: 'Funko Caractericticas Especiales',
            type: 'string',
            demandOption: true
        },
        val: {
            description: 'Funko Valor Mercado',
            type: 'number',
            demandOption: true
        }
    
    }, (argv) => {
        const funko = new Funko(argv.id, argv.name, argv.desc,argv.type,argv.gener, argv.franq, argv.num, argv.excl, argv.esp, argv.val);
        const request:RequestType = {
            type:'update',
            username: argv.user,
            funkoPop: funko
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('remove', 'borrar un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
    
    }, (argv) => {
        const request:RequestType = {
            type:'remove',
            username: argv.user,
            id: argv.id
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

    .command('show', 'muestra un funko', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        },
        id: {
        description: 'Funko ID',
        type: 'number',
        demandOption: true
        },
    
    }, (argv) => {
        const request:RequestType = {
            type:'read',
            username: argv.user,
            id: argv.id
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })



    .command('list', 'lista los funkos de un usuario', {
        user: {
        description: 'Nombre de usuario',
        type: 'string',
        demandOption: true
        }
    
    }, (argv) => {
        const request:RequestType = {
            type:'list',
            username: argv.user,
        }
        socket.emit('request',request)
        socket.on('response',(response:ResponseType)=>{
            if(response.success){
                console.log(response.successmsg)
            }else{
                console.error('No se pasaron los argumentos correctos al servidor')
            }
        })
    })

.help()
.argv
```

como se puede observar, el cliente y el servidor utilizando los tipos de mensaje que se proporcionan en el enunciado de este ejercicio y que se han modificado ligeramente para que puedan ser correctamente usados por las clases que se han creado para el ejercicio.

### ResponseType y RequestType
```typescript
export type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    id? : number;
    username: string
    funkoPop?: Funko;
}
  
export type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list' |'unknown';
    success: boolean;
    successmsg? : string;
}
```
