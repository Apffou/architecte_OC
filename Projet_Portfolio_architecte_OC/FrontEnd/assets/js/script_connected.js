let modal = null;

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    //Fonction pour afficher la bonne étape dans la modale
    step = 1;
    stepUpdate(step);
    // On recupère la modale en ciblant l'attribut href
    const modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.visibility = "visible";
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');

    // Click sur croix on ferme la modale
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
}
// Fonction qui permet de fermer la boite modale
const closeModal = function (e) {
    e.preventDefault();
    let modal = document.querySelector('#wrapper-modal');
    modal.style.visibility = "hidden";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    e.target.removeEventListener('click', closeModal);
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

// Fermeture de la modale au click en dehors de celle ci 
const asideClose = document.querySelector("#wrapper-modal");
asideClose.addEventListener('click', function (e) {
    if (e.target === asideClose) {
        asideClose.style.visibility = "hidden";
    }
})

// Affichage des éléments HTML en mode édition si connecté
// Recuperation du token
const token = window.localStorage.getItem("token");
//Si on a le token alors on enlève la class hidden pour faire apparaitre les éléments
if (token) {
    const userLogsDOM = document.querySelectorAll(".user-logged-element");
    userLogsDOM.forEach(element => {
        element.classList.remove("hidden");
    })
    let modalTitle = document.querySelector(".modal-wrapper h2")
    modalTitle.innerText = "Galerie photo";
    document.getElementById('id-login').style.display = "none";
    //Appel de la fonction pour se deconnecter
    logOut();
    // Appel de la fonction qui créer mes projets supprimable dans modal step 1
    CreateProjectElementModale();
}

//Affichage de la modale step 2 "ajout de projet"
const btnModale = document.querySelector(".btn_modale");
const modalWrapper = document.querySelector(".modal-wrapper");
btnModale.addEventListener('click', function () {
    step = 2;
    stepUpdate(step);
    let modalTitle = document.querySelector(".title-modal-2 h2")
    modalTitle.innerHTML = "Ajout photo";
    // Affichage de la flèche quand on est sur modale step 2 
    if (step === 2) {
        const arrow = document.querySelector(".arrow");
        arrow.style.display = "block";

        arrow.addEventListener('click', function () {
            step = 1;
            stepUpdate(step)
        })
    }
})

//  Récuperation des éléments du formulaire
const formElement = document.getElementById("add-form");
formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    //Appel de la fonction dans le back end
    const callFetch = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    // une fois le projet envoyé , retour à la modale step 1
    if (callFetch.status === 201) {
        step = 1;
        stepUpdate(step);
        const img = document.querySelector('.image-sendbox label img');
        img.src = "";
        formElement.reset();
        const editionDOM = document.querySelector(".js-container-gallery");
        editionDOM.innerHTML = "";
        const galleryDOM = document.querySelector(".gallery");
        createProjectElementHtml();
        galleryDOM.innerHTML = "";
        CreateProjectElementModale();
    }
    else {
        const msgError = document.querySelector(".msg-error");
        msgError.innerHTML = "L'envoi du formulaire à échoué."
    }
}
)

// Si tous les champs sont remplis alors le bouton devient vert et cliquable
document.getElementById('add-form').addEventListener('change', function () {
    const checkValue = "#add-img, #Titre, #Category-select";
    const allFilled = checkValue.split(', ').every(selector => {
        return document.querySelector(selector).value;
    });
    if (allFilled) {
        document.querySelector('#add-form [type="submit"]').removeAttribute('disabled');
    } else {
        document.querySelector('#add-form [type="submit"]').setAttribute('disabled', 'disabled');
    }
});

// affichage de l'image dans la console
 document.getElementById('add-img').addEventListener('change', function (e) {
    console.log(this.files[0]);
    console.log(e.target.result);
    const reader = new FileReader();
    reader.onload = function (e) {
     document.querySelector('.image-sendbox label img').src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
});