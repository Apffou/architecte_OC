

let modal = null;

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    console.log("open")
    // On recupère la modale
    const modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.visibility = "visible";
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    // Click sur croix on ferme
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
}
// Fonction qui permet de fermer la boite modale
const closeModal = function (e) {
    e.preventDefault();
    console.log("close")
    let modal = document.querySelector('#modal');
    modal.style.visibility = "hidden";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    e.target.removeEventListener('click', closeModal);
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
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



    // Appel de la ressource 
    /*
    const worksRespons = await fetch("http://localhost:5678/api/works");
    const projects = await worksRespons.json();
    const galleryDOM = document.querySelector(".js-container-gallery");

    projects.forEach(element => {
        const divDOM = document.createElement("div");
        const imageDOM = document.createElement("img");
        const binDOM = document.createElement("img");
        imageDOM.src = element.imageUrl;


        divDOM.appendChild(imageDOM);
        divDOM.appendChild(binDOM);
        galleryDOM.appendChild(divDOM);

    });*/
}





// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME