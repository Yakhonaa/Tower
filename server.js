//SERVER FUNCTIONALITY
import {alph_key, create_alphabets, encrypt, sum, appe, splitter, decrypt, process} from './cypher.js'

import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
const port = 3002

app.get('/', (req,res)=>{
    console.log('alive')
    res.status(200).send({code: 0, message: 'ok'})
})


app.get('/encrypt',(req,res)=>{
    const {text, servKey, key} = req.query
    let answer = process(text, servKey, key, 'encrypt')
    answer = answer.join("")
    res.send({"answer": answer})
})

app.get('/decrypt',(req,res)=>{
    const {text, servKey, key} = req.query
    let answer = process(text, servKey, key, 'decrypt')
    answer = answer.join("")
    res.send({"answer": answer})
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening on port:', port)
})

