//CYPHER SCRIPT
export {alph_key, create_alphabets, encrypt, sum, appe, splitter, decrypt, process}
let reassembledList = []


function alph_key(keyPhase, letters, index){
    //create new phased shifted alphabet
    letters = [...letters]
    let engLength = letters.length
    let newAlph = []
    let key = keyPhase;
    let shift = (keyPhase.slice(7,9)) % engLength

    for(let i = 0; i<shift;i++){
        letters.push(letters.shift())}

    let phase = (keyPhase.slice(8,12))
    let phaseLength = phase.length
    for(let i = 0; i<engLength; i++){
        let char = phase[ i % phaseLength]
        newAlph.push(...letters.splice(char%letters.length,1))
    }
    //end of phased alphabet -> newAlph

    function createIndexes(password){
        let ArrayOfIndexes = []
        let SecondIndexes = []
        let SumOfArray = 0
        console.log(password.length)
        for(let i = 0; i<password.length; i++){
            SumOfArray += Number(password[i])
            ArrayOfIndexes.push(SumOfArray)
            SecondIndexes.push(Number(SumOfArray+1))
        }
        let MidArray = ArrayOfIndexes.concat(SecondIndexes)
        while(MidArray.length != engLength){
            MidArray.push(Number(MidArray.slice(-1)) + 1)
        }
        
    let absoluteAlphabet = {}
    newAlph.map((e,i) => {absoluteAlphabet[e] = MidArray[i] * index})
    return absoluteAlphabet
    }
    return createIndexes(key, engLength) 
}

function create_alphabets(index, letters, zero_alph){
    console.log("crIndex",letters)
    let answer = {}
    let rev_answer = {}
    let std_answer = {}
    letters.map((e,i)=>{rev_answer[(i+1)*2] = e })
    letters.map((e,i)=>{std_answer[e] = (i+1) * 2 })
    console.log(zero_alph)
    return [zero_alph, rev_answer, std_answer]   
}

function process(oText, serverKey, encryptKey, switcher){
    encryptKey = encryptKey.replace(/0/g,'2')
    encryptKey = encryptKey.replace(/1/g,"3")
    encryptKey = encryptKey.slice(0,12)
    if (encryptKey.length < 12) {return [...'']}
    let letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ ']
    const zero_alph = alph_key(encryptKey, letters, serverKey)
    let alph = create_alphabets(serverKey, letters, zero_alph)
    if (switcher == 'encrypt') {
        return encrypt(oText, alph)
    }
    else  {
        return decrypt(oText, alph)
    }
}

function encrypt(oText, alph) {
    reassembledList.splice(0, reassembledList.length)
    let text = [...oText]
    
    let numberedlist = text.map((element) => appe(alph[0][element.toUpperCase()],1));
    numberedlist.map((list) => splitter(list, alph))
    
    let reSlength = reassembledList.join("").length 
    //let decrypted = decrypt(reassembledList, alph)
    return reassembledList
}

function decrypt(text, alph){
    text = [...text]
    let temporaryVar = []
    let integerStorage = []
    let answer = []
    //reversing array
    let rev = {};
    for(let key in alph[0]){
        rev[alph[0][key]] = key;
    }
    console.log(rev)
    //decrypring process
    for(let i = 0; i<text.length; i++){
        //O(3n)
        if(text[i] in [1,2,3,4,5,6,7,8,9]){
            integerStorage.push(text[i])
        }
        else{
            let letter = alph[2][text[i]]
            if(text[i] == "A"){
                let temporarySum = 0
                for(let x = 0; x<temporaryVar.length; x++){           
                    temporaryVar[x] = `${temporaryVar[x]}`      
                    let twoDigitsSum = Number(temporaryVar[x][0])+Number(temporaryVar[x][1])
                    temporarySum += twoDigitsSum
                }
                answer.push(rev[temporarySum])
                temporaryVar = []
                continue
            } 
            for(let q = integerStorage.length; q > 0; q--){
                let operation = integerStorage[q-1] == 1 ? letter += 1 : letter *= 2
            }
            temporaryVar.push(letter)
            integerStorage = []       
        }}  
return answer}

function sum(list){
    let result = Number(0)
    for(let i=0; i<=list.length - 1; i++){
        result += Number(list[i])
    }
    return result
}

function appe(index){

    //THIS FUNCTION IS serving each letter separately
    //and returning a list with its random values
    index = Number(index)
    let letterList = [];

    //populationg the letterList with random values
    while(sum(letterList) < index){
        letterList.push(Number(Math.floor(Math.random() * 9)+1));
    }
    let total = sum(letterList);
    //checking the total sum and changing it if necessary
    if(total > index){
        let dif = total-index;
        letterList.push(letterList.pop()-dif)
    }
    //appending to EVEN length of letterList
    if(letterList.length % 2 != 0){
        letterList.push(Number(0))
    }
    return letterList
}

function splitter(numList, alph){
    //THIS FUNCTION IS taking each array of random numbers
    //and reassembling them by #1,2 and rvrsAlphabet
    //adding to the end of each completed letter a pointer "A1"

    for(let i = 0; i < numList.length; i+=2){
        let letters
        letters = [numList[i],numList[i+1]].join(""),
        letters = Number(letters)

        if(letters % 2 === 1){
            letters -= 1;
            reassembledList.push(1)
        }
        if(letters > 52){
            letters /= 2;
            reassembledList.push(2)
        }
        if(letters % 2 === 1){
            letters -= 1;
            reassembledList.push(1)
        }
        
        reassembledList.push((alph[1][letters]).toUpperCase())
    }
    reassembledList.push("A") 
}
