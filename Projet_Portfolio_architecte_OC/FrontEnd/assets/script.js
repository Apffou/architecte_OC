// Appel de la ressource 
const worksRespons = await fetch("http://localhost:5678/api/works");
const projects = await worksRespons.json();


const galleryDOM = document.querySelector(".gallery");


// Boucle sur tableau pour creer les elements Projets du site
projects.forEach(element => {

    const figureDOM = document.createElement("figure")
    const projectImage = document.createElement("img");
    const projectLegend = document.createElement("figcaption");
    figureDOM.setAttribute("id_filters", element.categoryId)
    projectImage.src = element.imageUrl;
    projectImage.alt = element.title;
    projectLegend.innerText = element.title;


    figureDOM.appendChild(projectImage);
    figureDOM.appendChild(projectLegend);
    galleryDOM.appendChild(figureDOM);

});

// Filtre : utilisation de la propriete category : id.
// objets html : id 1 / appartements = id2 / hotels & res = id 3 / toutes les categories = Users ID

const categoryRespons = await fetch("http://localhost:5678/api/categories");
const tagsCategory = await categoryRespons.json();


const parentFilters = document.querySelector(".filters");

//Creation bouton span ALL
let elementFilter = document.createElement("span");
elementFilter.classList.add("tag")
elementFilter.innerText = "Tous";
parentFilters.appendChild(elementFilter);



// Creation bouton span filtres avec leurs ID
tagsCategory.forEach(element => {
    elementFilter = document.createElement("span");
    elementFilter.classList.add("tag");
    elementFilter.innerText = element.name;
    elementFilter.setAttribute("data-id", element.id)
    parentFilters.appendChild(elementFilter);


})

const elementFilterALL = document.querySelectorAll(".filters span");


elementFilterALL.forEach(elementfilter => {
    elementfilter.addEventListener("click", function (event) {
        let filtreID = event.target.getAttribute("data-id");
        const figureDomALL = document.querySelectorAll(".gallery figure");

        figureDomALL.forEach(element => {
            element.style.display = "none";
        })
//condition pour afficher les elements correspondant à l'ID
        if (filtreID){
            const filterID1 = document.querySelectorAll(`figure[id_filters='${filtreID}']`);

            filterID1.forEach(elementID1 => {
                elementID1.style.display = "block";
            
            })
            // Sinon affiche tous les elements par defaut
        }else {
            figureDomALL.forEach(element => {
                element.style.display = "block";
            })
        }

    });
})


