let modal = null;
let step = 0; 


// Fonction pour afficher la bonne étape dans la modale
function stepUpdate(step){
    //Si on a un mauvais un numero d'étape, la fonction ne se lance pas. 
    if (step < 1)
    return;

    const modalStep = document.querySelectorAll(".modal-step");
    modalStep.forEach(element => {
        element.style.display = "none";

        const totot = element.dataset.step;
        console.log(totot)
        if ( totot == step){
            element.style.display = "block";
            console.log("toto1")
        }
    })
}

// Fonction qui permet d'afficher la boite modale
const openModal = function (e) {
    e.preventDefault();
    step=1;
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
asideClose.addEventListener('click', function(e) {
    if (e.target === asideClose){
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


    // Suppression d'un projet


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
            const removeElementModal = document.querySelector(`div[data-projet='${id}']`);
            const removeElementProject = document.querySelector(`figure[data-projet='${id}']`);
            removeElementModal.remove(); 
            removeElementProject.remove(); 
            
            }

        }


// Au click sur le bouton ajouter une photo, vider la modale et remplacer par un autre contenu html. 
// Creation du formulaire
//Ne pas oublier le message d'erreur si le formulaire n'est pas correctement rempli 
//Afficher une reponse de l'api si le formulaire est correctement envoyé 
// au rechargment de la page, le nouveau projet doit s'afficher dans la galerie


const btnModale = document.querySelector(".btn_modale");
const modalWrapper = document.querySelector(".modal-wrapper");
btnModale.addEventListener('click' , function(){
    step = 2;
    stepUpdate(step);
    return;
    const arrowDOM = document.createElement("i");
        arrowDOM.classList.add("fa-solid", "fa-arrow-left", "fa-xl");
    const crossDom = document.createElement("i");
        crossDom.classList.add("fa-solid", "fa-xmark", "fa-xl");

        let modalTitle = document.querySelector(".modal-wrapper h1")
        modalTitle.innerText = "Ajout photo";
       // const btn =   document.querySelector(".modal-wrapper .btn_modale")
        //btn.innerText ="+ Ajouter photo";

    const divAddContentBlockDOM = document.createElement("div");
        divAddContentBlockDOM.classList.add("js-add-content-block")
    const divAddContent = document.createElement("div");
        divAddContent.classList.add("js-add-content");
            const iconeDOM = document.createElement("i");
                iconeDOM.classList.add("fa-solid", "fa-mountain-sun", "fa-flip-horizontal", "fa-2xl", "js-icone")
            const buttonAddDOM = document.createElement("button");
                buttonAddDOM.innerText = "+ Ajouter photo";
                buttonAddDOM.classList.add("js-button-add");
            const cautionParagraphe = document.createElement("p");
                cautionParagraphe.innerText = "jpg, png : 4 mo max";
    // Création du formulaire et du bouton de validation par interpolation
    const divAddFormDOM = document.createElement("div");
        divAddFormDOM.classList.add("form-parent");
    const formDOM = `
			<form action="#" method="post" class="js-form" id="add-form">
				<label for="Titre">Titre</label>
				<input type="text" name="titre" id="Titre">
				<label for="Category">Catégorie:</label>
			
				<select name="Categorie" id="Category-select">
				  <option value=""></option>
				  <option value="1">Objets</option>
				  <option value="2">Appartements</option>
				  <option value="3">Hotels & restaurants</option>
				</select>
				</form>
    `;
    const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("btn-add-content")
    const btnAddContent = `
    <button type="submit" id="add-form"> Valider </button>
    `;


    modalWrapper.appendChild(arrowDOM);
    modalWrapper.appendChild(crossDom);
    modalWrapper.appendChild(divAddContentBlockDOM);
    modalWrapper.appendChild(buttonDiv);


    divAddContentBlockDOM.appendChild(divAddContent);
    divAddContent.appendChild(iconeDOM);
    divAddContent.appendChild(buttonAddDOM);
    divAddContent.appendChild(cautionParagraphe);
    divAddContentBlockDOM.appendChild(divAddFormDOM);
    divAddFormDOM.innerHTML= formDOM;

    buttonDiv.innerHTML =btnAddContent;

} )






//  INFO DEUXIEME PARTICours. Pour la partie pour envoyer du texte, image revoir Types MIME
