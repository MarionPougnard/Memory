import { images } from "./images.js";

window.onload = init;

const choixMemory = "legumes";
function init(){
    //todo : aller chercher dans le localstorage user
    afficherUser();
    document.getElementById("choixMemory").addEventListener("change", chargerImageMemory);


}

function getUser() {
    return JSON.parse(window.localStorage.getItem("user") ?? "[]");
}

function afficherUser() {
    const nom = getUser().nom;
    const email = getUser().email;
    console.log(nom);

    document.getElementById("nomUtilisateurProfil").value = nom;
    document.getElementById("emailProfil").value = email;
}

function chargerImageMemory(event) {
   // document.getElementById("visualisationMemoryChoisi").remove("img");
    
    const choixMemory = event.target.value;
    const src = images.find(v => v.dossier === choixMemory).detail;
    console.log(src);
    const img = document.createElement("img");
    img.setAttribute("src", src);
    document.getElementById("visualisationMemoryChoisi").appendChild(img);

    tailleMemory();
}

function tailleMemory() {
    const longueurMemory = images.find(v => v.dossier === choixMemory).longueur;
    const nbLignes = Math.floor(longueurMemory * 2 / 4); //2 car on affiche 2 fois une image et 4 c'est le nombre d'image par ligne

    for (let l = 2; l = nbLignes; l++) { // au minmum 2 lignes
        const longueur = 4 * l;
        const option = document.createElement("option");
        option.setAttribute("value", longueur);
        option.innerText(`4 * ${2}`);
        document.getElementById("tailleMemory").appendChild(option);
    }
}

// todo : envoyer sur le localStorage profils en ajoutant à cet utilisateur le choix du memory et la taille