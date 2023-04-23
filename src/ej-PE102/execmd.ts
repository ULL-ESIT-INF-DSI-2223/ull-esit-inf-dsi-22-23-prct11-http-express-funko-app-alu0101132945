import {spawn} from 'child_process'

/**
 * metodo que ejecuta un comando de linux
 * @param command comando que se va a ejecutar
 * @param options si existe, son las opciones que utiliza el comando
 * @return un objeto json con error si el comando no se ha ejecutado correctamente o output si se ha ejecutado correctamente
 */
export function execute(command:string, options?:string[]){
    if(options){
        const result = spawn(command,options);
        result.on('error',(err) => {
            return {
                error: err
            }
        });
        result.stderr.on('data',(data) => {
            return {
                error: data
            }
        })
        let msg = ''
        result.stdout.on('data',(data) => {
            msg += data
        })
        result.on('close',(data) => {
            return {
                output: msg
            }
        })
    }else{
        const result = spawn(command);
        result.on('error',(err) => {
            return {
                error: err
            }
        });
        result.stderr.on('data',(data) => {
            return {
                error: data
            }
        })
        let msg = ''
        result.stdout.on('data',(data) => {
            msg += data
        })
        result.on('close',(data) => {
            return {
                output: msg
            }
        })
    }
}