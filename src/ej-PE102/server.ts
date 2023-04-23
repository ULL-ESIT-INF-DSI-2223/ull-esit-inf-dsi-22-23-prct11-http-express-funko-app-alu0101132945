import express from 'express'
import {execute} from './execmd.js'

const app = express();

app.get('/execmd',(req,res) =>{
    if(!req.query.cmd){
        res.send({
            error: 'no command was provided'
        });
    }else {
        if(req.query.args){
            let aux = req.query.args as string
            let args = aux.split(' ')
            res.send(execute(req.query.cmd as string,args))
        }
        else{
            res.send(execute(req.query.cmd as string))
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
