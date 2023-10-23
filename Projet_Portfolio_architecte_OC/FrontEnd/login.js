
function test() {
    const connectingForm = document.querySelector(".connecting_form");

    connectingForm.addEventListener("submit", function (event) {
        const interfaceLogin = {
            email: event.target.querySelector(`"name="email"`).value,
            motDePasse: event.target.querySelector("[name=password]").value,
        };
        // création de la chargeUtile en format JSON
        const chargUtile = JSON.stringify(interfaceLogin);
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargUtile
        });
    })

}





// Appel de la fonction fetch avec toutes les informations nécessaires


// Fonction POST pour
// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME


/**Lorsque le couple identifiant et mot de passe n’est pas bon pour se connecter il faut afficher le message d’erreur: 
“Erreur dans l’identifiant ou le mot de passe”
Lorsque le couple identifiant et mot de passe est correct, alors il faut rediriger vers la page du site avec cette 
fois ci des boutons d’actions pour éditer le site. */