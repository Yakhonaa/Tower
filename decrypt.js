
function decrypt(text){
    let temporaryVar = []
    let integerStorage = []
    let answer = []

    for(let i = 0; i<text.length; i++){
        //O(n)
        if(text[i] in [1,2,3,4,5,6,7,8,9]){
            integerStorage.push(text[i])
        }
        else{
            letter = alph[2][text[i]]

            if(text[i] == "A"){
                answer.push(temporaryVar)
                console.log("Temp:",temporaryVar)
                temporaryVar = []
                continue
            }
            for(let q = 0; q<integerStorage.length; q++){
                operation = integerStorage[q] == 1 ? letter += 1 : letter *= 2
            }
            temporaryVar.push(letter)
            integerStorage = []       
        }
    }
console.log(answer)
}
