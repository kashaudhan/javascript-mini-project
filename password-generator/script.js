const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_-+={[]}:;?><,.'\"";

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if(!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password Copied to clipboard");
});

function generatePassword(){
    const len = lenEl.value;

    let password = "";

    if(upperEl.checked) password += getUpperCase();
    if(lowerEl.checked) password += getLowerCase();
    if(numberEl.checked) password += getNumber();
    if(symbolEl.checked) password += getSymbol();

    for(let i=password.length; i<len; i++){
        const pswd = generateX()
        password += pswd;
    }
    pwEl.innerText = password;
}

function generateX(){
    const x = [];
    if(upperEl.checked) x.push(getUpperCase());
    if(lowerEl.checked) x.push(getLowerCase());
    if(numberEl.checked) x.push(getNumber());
    if(symbolEl.checked) x.push(getSymbol());
    if(x.length === 0) return "";

    return x[Math.floor(Math.random()*x.length)];
}

function getLowerCase(){
    return lowerLetters[Math.floor(Math.random()*lowerLetters.length)];
}

function getUpperCase(){
    return upperLetters[Math.floor(Math.random()*upperLetters.length)];
}

function getNumber(){
    return numbers[Math.floor(Math.random()*numbers.length)];
}

function getSymbol(){
    return symbols[Math.floor(Math.random()*symbols.length)];
}