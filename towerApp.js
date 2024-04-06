//CLIENT SERVER FUNCTIONALITY
import fs from 'fs'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const PORT = 5501

app.use(express.static("public"))
app.get('/tower', (req, res) => {
    let body = fs.readFile('./public/tower.html', 'utf-8', (err, data)=>{
        res.send(data)
    })
    })

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening on port:', PORT)
})




