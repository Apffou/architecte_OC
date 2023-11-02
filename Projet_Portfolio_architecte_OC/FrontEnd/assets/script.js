// Appel de la ressource 
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


const categoryRespons = await fetch("http://localhost:5678/api/categories");
const tagsCategory = await categoryRespons.json();


const parentFilters = document.querySelector(".filters");

//Creation bouton span ALL
let elementFilter = document.createElement("span");
elementFilter.classList.add("tag")
elementFilter.innerText = "Tous";
elementFilter.classList.add("tag_selected")
parentFilters.appendChild(elementFilter);



// Creation bouton span filtres avec leurs ID
tagsCategory.forEach(element => {
    elementFilter = document.createElement("span");
    elementFilter.classList.add("tag");
    elementFilter.innerText = element.name;
    elementFilter.dataset.id = element.id;
    parentFilters.appendChild(elementFilter);

})


const elementFilterALL = document.querySelectorAll(".filters span");


elementFilterALL.forEach(elementfilter => {
    elementfilter.addEventListener("click", function (event) {
        //let filtreID = event.target.getAttribute("data-id");
        let filtreID = event.target.dataset.id;
        console.log(filtreID)
        //const toti = document.querySelectorAll(".tag.tag_selected");
        //toti.forEach(element => {
        //     element.classList.remove("tag_selected");
        // })

        document.querySelector(".tag_selected").classList.remove("tag_selected");

        event.target.classList.add("tag_selected");
        const figureDomALL = document.querySelectorAll(".gallery figure");

        figureDomALL.forEach(element => {
            element.style.display = "none";
        })
        //condition pour afficher les elements correspondant à l'ID
        if (filtreID) {
            const filterID1 = document.querySelectorAll(`figure[data-category-id='${filtreID}']`);
            filterID1.forEach(elementID1 => {
                elementID1.style.display = "block";

            })
            // Sinon affiche tous les elements par defaut
        } else {
            figureDomALL.forEach(element => {
                element.style.display = "block";

            })
        }

    });
})