/*async function fetchWorks() {
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

  // Suppression d'un projet Modale Step 1 au clic 
  const garbageDom = document.querySelectorAll(".trash-ico");
  garbageDom.forEach(element => {
      element.addEventListener('click', function () {
          const id = element.dataset.projet;
          deleteProject(id);
      })
  });
}


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
}*/

async function CreateProjectElementHtml () {
  const worksRespons = await fetch("http://localhost:5678/api/works");
  const projects = await worksRespons.json();
  
  const galleryDOM = document.querySelector(".gallery");
  
  // Boucle sur tableau pour creer les elements Projets du site
  projects.forEach(element => {
  
      const figureDOM = document.createElement("figure")
      const projectImage = document.createElement("img");
      const projectLegend = document.createElement("figcaption");
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