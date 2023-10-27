let modal = null;

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
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
    let modal = document.querySelector('#modal');
    modal.style.display = "none";
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
    }





// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME