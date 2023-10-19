// Appel de la ressource 
const worksRespons = await fetch("http://localhost:5678/api/works");
const projects = await worksRespons.json();


const galleryDOM = document.querySelector(".gallery");


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
    galleryDOM.appendChild(projectParent);
    
});

// Filtre : utilisation de la propriete category : id.
// objets html : id 1 / appartements = id2 / hotels & res = id 3 / toutes les categories = Users ID

const categoryRespons =  await fetch("http://localhost:5678/api/categories");
const tagsCategory = await categoryRespons.json();
console.log(tagsCategory)


const parentFilters = document.querySelector(".filters");
const elementAllFilter = document.createElement("span");
elementAllFilter.classList.add("tag")
elementAllFilter.innerText = "Tous";
parentFilters.appendChild(elementAllFilter);


tagsCategory.forEach(element => {
    const elementFilter = document.createElement("span");
    elementFilter.classList.add("tag");
    elementFilter.innerText= element.name;
    elementFilter.setAttribute("id_filters", element.id)
    parentFilters.appendChild(elementFilter);
})
