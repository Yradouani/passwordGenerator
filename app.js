function getRandomNumber(min, max) {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];

    randomNumber = randomNumber / 4294967296;
    return Math.trunc(randomNumber * (max - min + 1)) + min;
}

function addSet(fromCode, toCode) {
    let charactersList = "";

    for (let i = fromCode; i <= toCode; i++) {
        charactersList += String.fromCharCode(i);
    }
    return charactersList;
}

const charactersSet = {
    min: addSet(97, 122),
    maj: addSet(65, 90),
    number: addSet(48, 57),
    spec: addSet(33, 47) + addSet(58, 64) + addSet(91, 96) + addSet(123, 126)
}

const passwordContent = document.querySelector('.password-content');
const errorMessage = document.querySelector('.error-message');
const generateButton = document.querySelector('.generate');
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const range = document.querySelector("input[type='range']");
const rangeLabel = document.querySelector('.range-container label');

rangeLabel.textContent = `Taille du mot de passe : ${range.value}`;

let passwordLength = range.value;

generateButton.addEventListener("click", createPassword);

function createPassword() {
    const checkedDataSets = checkedSets();


    if (checkedDataSets.length) {
        errorMessage.textContent = "";

    } else {
        errorMessage.textContent = "Vous devez cocher au minimum une case !";
        return;
    }

    const concatenatedDataSets = checkedDataSets.reduce((acc, cur) => acc + cur);
    console.log(concatenatedDataSets);

    let password = "";

    let passwordBase = [];
    for (let i = 0; i < checkedDataSets.length; i++) {
        passwordBase.push(checkedDataSets[i][getRandomNumber(0, checkedDataSets[i].length - 1)])
    }

    for (let i = checkedDataSets.length; i < passwordLength; i++) {
        password += concatenatedDataSets[getRandomNumber(0, concatenatedDataSets.length - 1)]
    }


    passwordBase.forEach((item, index) => {
        const randomIndex = getRandomNumber(0, password.length);
        password = password.slice(0, randomIndex) + passwordBase[index] + password.slice(randomIndex);

        passwordContent.textContent = password;
    })

    console.log(password)
}

function checkedSets() {
    const checkedSets = [];

    checkboxes.forEach(checkbox => checkbox.checked && checkedSets.push(charactersSet[checkbox.id]));

    return checkedSets;
}

range.addEventListener("input", handleRange);

function handleRange(e) {
    passwordLength = e.target.value;
    rangeLabel.textContent = `Taille du mot de passe : ${passwordLength}`;
}

const copyBtn = document.querySelector('.btn-copy');
copyBtn.addEventListener("click", copyPassword);

function copyPassword() {
    navigator.clipboard.writeText(passwordContent.textContent);
}