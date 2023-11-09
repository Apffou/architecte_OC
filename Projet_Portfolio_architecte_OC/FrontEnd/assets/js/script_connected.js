let modal = null;
let step = 0;

// Fonction pour afficher la bonne étape dans la modale
function stepUpdate(step) {
    //Si on a un mauvais un numero d'étape, la fonction ne se lance pas. 
    if (step < 1)
        return;

    const modalStep = document.querySelectorAll(".modal-step");
    modalStep.forEach(element => {
        element.style.display = "none";

        const totot = element.dataset.step;
        if (totot == step) {
            element.style.display = "block";
        }
        if (step === 1) {
            const arrow = document.querySelector(".arrow");
            arrow.style.display = "none";
        }
    })
}

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    step = 1;
    stepUpdate(step);
    // On recupère la modale
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


// Affichage des éléments HTML en mode édition

const token = window.localStorage.getItem("token");
if (token) {
    const domVisible = document.querySelectorAll(".visible");

    domVisible.forEach(element => {
        element.style.visibility = "visible";
    })
    let modalTitle = document.querySelector(".modal-wrapper h1")
    modalTitle.innerText = "Galerie photo";
    document.getElementById('id-logout').innerHTML = "logout";
    // Appel de la fonction qui créer mes projets supprimable 
    CreateProjectElementModale();
}



const btnModale = document.querySelector(".btn_modale");
const modalWrapper = document.querySelector(".modal-wrapper");
btnModale.addEventListener('click', function () {
    step = 2;
    stepUpdate(step);
    let modalTitle = document.querySelector(".title-modal-2 h1")
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



//  RECUPERATION DES ELEMENTS DU FORMULAIRE

const formElement = document.getElementById("add-form");
formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formContent = {
        image: "",
        title: document.getElementById("Titre").value,
        category: document.getElementById("Category-select").value,
    }
    var formData = new FormData(this);

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




