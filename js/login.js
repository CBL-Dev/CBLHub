const scripturl = "https://script.google.com/macros/s/AKfycbyI4awJS_GMvU8rXH1zAbYDyxwz97GO66vBu9yx2Phy6lt-qW29QHSt6Hj_-iRb7iAR/exec";

function setFormErrorMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function addGS(){
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body : JSON.stringify({name:"CT"})    
    });
}

function getLogin(){
    var username = document.getElementById("loginUsername").value;
    var pin = document.getElementById("loginPIN").value;

    var url = scripturl + "?call=Login&user=" + username + "&pin=" + pin; 

    fetch(url).then(d => d.json()).then(d => {
        if(d[0].status == "valid") {
            setFormErrorMessage(document.querySelector("#login"),"success","Please wait redirecting...");
            location.href = "./pages/details.html";
        }
        else {
            setFormErrorMessage(document.querySelector("#login"),"error","Invalid Username or PIN.");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

       getLogin();
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "loginUsername" && e.target.value.length > 20) {
                setInputError(inputElement, "Username max 20 characters length.");
            }
            else if (e.target.id === "loginPIN" && (e.target.value.length > 5 || e.target.value.length < 3)){
                setInputError(inputElement, "PIN must be a 3-5 digit number.");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});