let createUserForm = document.getElementById('createUserForm');
let tilbakeMelding = document.getElementById('tilbakeMelding');
let inpUsername = document.getElementById("inpUsername");
let inpPsw = document.getElementById("inpPsw");


createUserForm.addEventListener('submit', async function (evt) {

    evt.preventDefault();
    let inpUsername = document.getElementById("inpUsername");
    let inpPsw = document.getElementById("inpPsw");

    let body = {
        username: inpUsername.value,
        password: inpPsw.value
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }




    let response = await fetch("/user", cfg);
    let data = await response.json();

    if (data === "success!") {
        location.href = "index.html";
    } else {
        createLoginResponse.innerHTML = "Username is taken!";
    }



}); 