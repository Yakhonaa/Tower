
let DB = []

function showDB() {
    console.log(DB)
}


const text='1N12N12W2X12O2XA1UXYA'
const servKey=2
const key = 921596317669

async function GETREQUEST(){
    fetch(`http://localhost:3002/decrypt?text=${text}&servKey=${servKey}&key=${key}`)
    .then((res) => res.json())
    .then((content) => {
    const {answer} = content
    console.log(answer)
    }).catch(err => console.log(err))}

GETREQUEST()