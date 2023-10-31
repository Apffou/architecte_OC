let modal = null;

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    // On recupère la modale
    const modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.visibility = "visible";
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    // Click sur croix on ferme la modale
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
}
// Fonction qui permet de fermer la boite modale
const closeModal = function (e) {
    e.preventDefault();
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
        binDOM.classList.add("fa-solid");
        binDOM.classList.add("fa-trash-can");
        binDOM.classList.add("trash-ico");
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


    // Suppression d'un projet


/*
   r "suppressionProjet(ID)" 
[] Cette fonction :  
    [] Envoi le fetch DELETE du projet ID
    [] Si on ne te renvoi pas d'erreur dans le JSON, selection de tous les elements HTML ayant data-projet="[ID]" 
    [] Pour chaque element trouvé, le supprimer du code (element.remove())*/ 

    const garbageDom = document.querySelectorAll(".trash-ico");
    garbageDom.forEach(element => {
        element.addEventListener('click', function(){
            const id = element.dataset.projet;
            deleteProject(id);
            })
            });


    async function deleteProject(id){
      const fetchDelete = await fetch("http://localhost:5678/api/works/"+id, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}`},

        });

        if (fetchDelete.status === 204){
            const removeElement = document.querySelector(`div[data-projet='${id}']`);
            removeElement.remove(); 

            console.log("TU ME VOIS LAAAA")
            }

        }

//  INFO DEUXIEME PARTICours. Pour la partie pour envoyer du texte, image revoir Types MIME
