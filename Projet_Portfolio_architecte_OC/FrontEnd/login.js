
function test() {
    const connectingForm = document.querySelector(".connecting_form");

    connectingForm.addEventListener("submit", async function (event) {
        // Désactivation du comportement par défaut du navigateur
        event.preventDefault();

        const interfaceLogin = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        // création de la chargeUtile en format JSON
        const chargUtile = JSON.stringify(interfaceLogin);

        // Appel de la fonction fetch avec toutes les informations nécessaires
        const userIdentifiants = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body: chargUtile,
            headers: { "Content-Type": "application/json" }

        });

        const  loginRespons = await userIdentifiants.json();

        //const token = "eiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
        //const emailValid = "email: sophie.bluel@test.tld";
        //const passwordValid = "S0phie";
        if (interfaceLogin.email !== loginRespons.userId && interfaceLogin.motDePasse !== loginRespons.token){
            console.log("ça marche paaaas")
            const errorMessage = document.querySelector(".login_error");
            errorMessage.innerText = '"Erreur dans l’identifiant ou le mot de passe"';
        }
        else {
            
        }
    })
}

test();





// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME


/**Lorsque le couple identifiant et mot de passe n’est pas bon pour se connecter il faut afficher le message d’erreur: 
“Erreur dans l’identifiant ou le mot de passe”
Lorsque le couple identifiant et mot de passe est correct, alors il faut rediriger vers la page du site avec cette 
fois ci des boutons d’actions pour éditer le site. */