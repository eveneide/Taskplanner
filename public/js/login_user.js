let inpUsername = document.getElementById("inpUsername");
let inpPsw = document.getElementById("inpPsw");
let loginForm = document.getElementById('loginForm');


let credentials = null;

loginForm.addEventListener('submit', async function (evt) {

    evt.preventDefault();

    let username = inpUsername.value
    let password = inpPsw.value


    credentials = "Basic " + window.btoa(`${username}:${password}`)

    let config = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": credentials
        }
    }


    let response = await fetch("/user/auth", config);
    let token = await response.json();

    if (response.status === 200) {
        console.log(token);
        sessionStorage.setItem("token", token);
        location.href = "task_list.html";
    } else {
        createLoginResponse.innerHTML = "Username/password is wrong!"
    }


});