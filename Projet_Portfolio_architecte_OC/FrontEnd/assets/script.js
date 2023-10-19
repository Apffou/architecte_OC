// Appel de la ressource 
const worksRespons = await fetch("http://localhost:5678/api/works");
const projects = await worksRespons.json();
console.log(projects)


const parentProject = document.querySelector(".gallery");

// suppression du html 
parentProject.innerHTML = "";

// Boucle sur tableau pour creer les elements Projets du site
projects.forEach(element => {

    const projectParent = document.createElement("figure")
    const projectImage = document.createElement("img");
    const projectLegend = document.createElement("figcaption");

    projectImage.src = element.imageUrl;
    projectImage.alt = element.title;
    projectLegend.innerText = element.title;

    projectParent.appendChild(projectImage);
    projectParent.appendChild(projectLegend);
    parentProject.appendChild(projectParent);
    
});

// Filtre : utilisation de la propriete category : id.
// objets html : id 1 / appartements = id2 / hotels & res = id 3 / toutes les categories = Users ID

const nameFilters = ["Test", "Objets", "Appartements", "Hotêl & restaurants"];

nameFilters.forEach(element => {
    const parentFilters = document.querySelector(".filters");
    const elementFilter = document.createElement("span");
    elementFilter.classList.add("default_style_filter");
    elementFilter.innerText= element;
    
    parentFilters.appendChild(elementFilter)
})

