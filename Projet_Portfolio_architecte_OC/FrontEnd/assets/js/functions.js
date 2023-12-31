async function fetchWorks(){
  const worksRespons = await fetch("http://localhost:5678/api/works");
  const projects = await worksRespons.json();
  return projects;
}

//Fonction pour créer un projet dans la page html
async function createProjectElementHtml () {
const projects = await fetchWorks();

  const galleryDOM = document.querySelector(".gallery");
  
  // Boucle sur tableau pour creer les elements Projets du site
  projects.forEach(element => {
      const figureDOM = document.createElement("figure")
      const projectImage = document.createElement("img");
      const projectLegend = document.createElement("figcaption");
      //Element pour permettre de filtrer les projets
      figureDOM.dataset.categoryId =  element.categoryId;
      figureDOM.dataset.projet = element.id;
      projectImage.src = element.imageUrl;
      projectImage.alt = element.title;
      projectLegend.innerText = element.title;
  
      figureDOM.appendChild(projectImage);
      figureDOM.appendChild(projectLegend);
      galleryDOM.appendChild(figureDOM);
  });
}

let step = 0;
// Fonction pour afficher la bonne étape dans la modale
function stepUpdate(step) {
  //Si on a un mauvais un numero d'étape, la fonction ne se lance pas. 
  if (step < 1)
      return;

  const modalStep = document.querySelectorAll(".modal-step");
  modalStep.forEach(element => {
      element.style.display = "none";

      const modalStep = element.dataset.step;
      if (modalStep == step) {
          element.style.display = "block";
      }
      //Si on est sur la step 1 alors n'affiche pas la flèche
      if (step === 1) {
          const arrow = document.querySelector(".arrow");
          arrow.style.display = "none";
      }
  })
}

//Fonction pour Créer les projets dans la modale step 1
async function CreateProjectElementModale() {
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
      imageDOM.classList.add("js-content-img");
      imageDOM.src = element.imageUrl;
      imageDOM.alt = element.title;
      // Indentation des éléments HTML
      divDOM.appendChild(binDOM)
      divDOM.appendChild(imageDOM);
      editionDOM.appendChild(divDOM)
  });
    // Suppression d'un projet Modale Step 1 au clic 
    const garbageDom = document.querySelectorAll(".trash-ico");
    garbageDom.forEach(element => {
        element.addEventListener('click', function () {
            const id = element.dataset.projet;
            deleteProject(id);
        })
    });
  }

  // Fonction pour supprimer les projets dans la modale
async function deleteProject(id) {

  const token = window.localStorage.getItem("token");
  const fetchDelete = await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },

  });
// Si bon staut alors on supprime le projet dans la modale et dans la page
  if (fetchDelete.status === 204) {
      const removeElementModal = document.querySelector(`div[data-projet='${id}']`);
      const removeElementProject = document.querySelector(`figure[data-projet='${id}']`);
      removeElementModal.remove();
      removeElementProject.remove();
  }
}

//Deconnection du mode administrateur
function logOut () {
  const logOutDOM = document.getElementById('id-logout');
  logOutDOM.style.display = "block"
  logOutDOM.addEventListener ('click', function() {
    document.location.href = "index.html";
    window.localStorage.removeItem("token")
  })
}