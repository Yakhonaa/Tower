
//WEBPAGE FUNCTIONALITY
let output = document.querySelector("#output")
let input =  document.querySelector("#input")
let mode = 'encrypt'
const switcher = document.querySelector("#switcher")
switcher.addEventListener("click", ()=>{
    mode = (mode == 'encrypt') ? 'decrypt' : 'encrypt'
    switcher.textContent = (mode == 'encrypt') ? "ENCRYPT" : "DECRYPT"
})
output.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value)
})
window.addEventListener("keydown", (e) => {
    if (e.key == 'Delete'){
    input.value = ''}
})


function take() {
const servKey = document.querySelector("#complexity")
const key = document.querySelector("#keyCodeText")
console.log(input.value, servKey.value, key.value)
const baseURL = `http://localhost:3002/${mode}?text=${input.value}&servKey=${servKey.value}&key=${key.value}`
        
fetch(baseURL).then((res) => res.json())
    .then((content) => {
    show(content)
    }).catch(err => console.log(err))
}
setInterval(()=>{
    take()
    }, 1000)

function show(data){
    //function showing data on the screen
    const {answer} = data
    if (answer[0] == "A") return '0' 
    output.textContent = answer
}

function randomKey(){
    let keyEl = document.querySelector("#keyCodeText")
    let key = []
    for(let i=0; i<12; i++){
        key.push([1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)])
    }
    keyEl.value = [...key].join("")
}