let modal = null;

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
}
// Fonction qui permet de fermer la boite modale
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal = null;
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})



// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME