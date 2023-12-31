import { images } from "./images.js";

window.onload = init;

const nom = getUser().nom;
let choixMemory = "legumes";

function init(){
    afficherUser();
    afficherMemory();
    document.getElementById("choixMemory").addEventListener("change", chargerImageMemory);
    document.getElementById("enregistrerOption").addEventListener("click", ajouterPreferenceUtilisateur);
}

function getUser() {
    return JSON.parse(window.localStorage.getItem("user") ?? "[]");
}

function getProfils() {
    return JSON.parse(window.localStorage.getItem("profils") ?? "[]");
}

function afficherUser() {
    const email = getUser().email;

    document.getElementById("nomUtilisateurProfil").value = nom;
    document.getElementById("emailProfil").value = email;
}

function afficherMemory() {  
    choixMemory = document.getElementById("choixMemory").value  
    const src = images.find(v => v.dossier === choixMemory).detail;
    const img = document.createElement("img");
    img.setAttribute("src", src);
    document.getElementById("visualisationMemoryChoisi").appendChild(img);

    tailleMemory();
}

function chargerImageMemory() {
//supprimer image et taille du memory déjà présent
    document.getElementById("visualisationMemoryChoisi").innerHTML = "";
    document.getElementById("tailleMemory").innerHTML = "";
    afficherMemory();
}

function tailleMemory() {
    const longueurMemory = images.find(v => v.dossier === choixMemory).longueur;
    const nbLignes = Math.floor(longueurMemory * 2 / 4); //2 car on affiche 2 fois une image et 4 c'est le nombre d'image par ligne

    for (let l = 2; l < nbLignes + 1; l++) { // au minimum 2 lignes
        const longueur = 4 * l;
        const option = document.createElement("option");
        option.setAttribute("value", longueur);
        option.setAttribute("id", l);
        option.innerText = `4 * ${l}`;
        document.getElementById("tailleMemory").appendChild(option);
    }
}

// todo : envoyer sur le localStorage profils en ajoutant à cet utilisateur le choix du memory et la taille
function ajouterPreferenceUtilisateur() {
    const tailleMemory = document.getElementById("tailleMemory").value;
    //todo : ajouter la taille du memory et le memory au Json getUser()
    const updatedUser = {...getUser(), choixMemory, tailleMemory};
    
    const updatedProfils = [...getProfils().filter(p => p.nom !== nom), updatedUser];
    window.localStorage.setItem("profils", JSON.stringify(updatedProfils));
}