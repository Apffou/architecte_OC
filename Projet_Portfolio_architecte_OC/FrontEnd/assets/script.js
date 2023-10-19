// Appel de la ressource 
const worksRespons = await fetch("http://localhost:5678/api/works");
const projects = await worksRespons.json();
console.log(projects)


const parentProject = document.querySelector(".gallery");


parentProject.innerHTML = "";

projects.forEach(element => {

    const toto = document.createElement("figure")
    const projectImage = document.createElement("img");
    const projectLegend = document.createElement("figcaption");

    projectImage.src = element.imageUrl;
    projectImage.alt = element.title;
    projectLegend.innerText = element.title;

    toto.appendChild(projectImage)
    toto.appendChild(projectLegend)
    parentProject.appendChild(toto)
    
});
