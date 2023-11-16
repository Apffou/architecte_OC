
const connectingForm = document.querySelector(".connecting_form");
// Addeventlistener qui réagit à l'envoi du formulaire
connectingForm.addEventListener("submit", async function (event) {
    // Désactivation du comportement par défaut du navigateur
    event.preventDefault();
    //Creation d'un objet pour recuperer les valeurs des champs du formulaire
    const interfaceLogin = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    // création d'une const qui recupere les paramètres et les convertit au bon format
    const settingsLogin = JSON.stringify(interfaceLogin);

    // Appel de la fonction fetch pour recuperer les identifiants
    const userIdentifiants = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: settingsLogin,
        headers: { "Content-Type": "application/json" }

    });

    const loginRespons = await userIdentifiants.json();
    //condition si j'ai le token alors tu stockes la donnée et tu me rediriges vers la page d'accueil
    if (loginRespons.token) {
        window.localStorage.setItem("token", loginRespons.token);
        document.location.href = "index.html";
    }
    //sinon tu affiches un message d'erreur à l'utilisateur
    else {
        const errorMessage = document.querySelector(".login_error");
        errorMessage.innerText = '"Erreur dans l’identifiant ou le mot de passe"';
    }
})
