// Cours. Pour la partie pour envoyer du texte, image revoir Types MIME
const openmodal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
}


document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openmodal)
})