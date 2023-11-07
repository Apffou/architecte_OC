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
    if (step === 1) {
        const arrow = document.querySelector(".arrow");
        arrow.style.display = "none";
    }

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
    document.getElementById('id-logout').innerHTML ="logout";
    let modalTitle = document.querySelector(".modal-wrapper h1")
    modalTitle.innerText = "Galerie photo";

    // Appel de la ressource 
    const worksRespons = await fetch("http://localhost:5678/api/works");
    const projects = await worksRespons.json();
    const editionDOM = document.querySelector(".js-container-gallery");

    projects.forEach(element => {
        // Création des éléments HTML
        const divDOM = document.createElement("div");
        const binDOM = document.createElement("i");
        const imageDOM = document.createElement("img");
        // Ajout des class sur ces éléments
        divDOM.classList.add("js-content");
        divDOM.dataset.projet = element.id;
        binDOM.classList.add("fa-solid", "fa-trash-can", "trash-ico");
        binDOM.dataset.projet = element.id;
        imageDOM.classList.add("js-content-img")

        imageDOM.src = element.imageUrl;
        imageDOM.alt = element.title;
        // Indentation des éléments HTML
        divDOM.appendChild(binDOM)
        divDOM.appendChild(imageDOM);
        editionDOM.appendChild(divDOM)
    });
}


// Suppression d'un projet Modale Step 1


const garbageDom = document.querySelectorAll(".trash-ico");
garbageDom.forEach(element => {
    element.addEventListener('click', function () {
        const id = element.dataset.projet;
        deleteProject(id);
    })
});


async function deleteProject(id) {
    const fetchDelete = await fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },

    });

    if (fetchDelete.status === 204) {
        const removeElementModal = document.querySelector(`div[data-projet='${id}']`);
        const removeElementProject = document.querySelector(`figure[data-projet='${id}']`);
        removeElementModal.remove();
        removeElementProject.remove();
    }
}



//Ne pas oublier le message d'erreur si le formulaire n'est pas correctement rempli 
//Afficher une reponse de l'api si le formulaire est correctement envoyé 


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
    }
    else {
        arrow.style.display = "none";
    }
})


//  !!!! RECUPERATION DES ELEMENTS DU FORMULAIRE

const formElement = document.getElementById("add-form");
formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formContent = {
        image : "",
        title : document.getElementById("Titre").value,
        category : document.getElementById("Category-select").value,
    }

    var formData = new FormData(this);

    if(formContent.title = null , formContent.category = null){

    }

    //Appel de la fonction dans le back end
    const callFetch = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: { "Authorization": `Bearer ${token}`,
         }
    });
}
)

// Si tous les champs sont remplis alors le bouton devient vert et cliquable. 

document.getElementById('add-form').addEventListener('change', function(){
    const checkValue = "#add-img, #Titre, #Category-select";
    const allFilled = checkValue.split(', ').every(selector => {
        console.log(selector);
        console.log(document.querySelector(selector));
        return document.querySelector(selector).value;
    });
    if (allFilled) {
        document.querySelector('#add-form [type="submit"]').removeAttribute('disabled');
    }else{
        document.querySelector('#add-form [type="submit"]').setAttribute('disabled', 'disabled');
    }
});

// affichage de l'image dans la console
document.getElementById('add-img').addEventListener('change', function(e){
    console.log(this.files[0]);
    console.log(e.target.result);
    document.querySelector('.image-sendbox label').innerHTML = `<img>`;
    const reader = new FileReader();
    reader.onload = function(e){
        document.querySelector('.image-sendbox label img').src = e.target.result;
    }
    reader.readAsDataURL(this.files[0]);
});