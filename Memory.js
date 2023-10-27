import { images } from "./images.js";

window.onload = init;

let compteurCoup = 0; // le nombre de comparaison
let compteurPair; // quand les cartes retournées sont identiques
let imageComparer1; // image à comparer undefined
let tailleMemory;
let bloquerClick = false; //permet de ne pas prendre les clicks en compte pendant le temps d'apparition des images
let arrayMemory = []; //tableau dans lequel on ajoute les images

function init(){
    //document.getElementById("enregistrerOption").addEventListener("click", initierJeu);
    afficherNbCoup();
    initierJeu();
    document.querySelectorAll("img").forEach(image => image.addEventListener("click", voirImage));
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            arrayMemory.length = 0;
            document.querySelectorAll(".visible").forEach(e => e.remove());;
            initierJeu();
        }
    });
}

function initierJeu() {
    const choixMemory = "dinosaures";
    //todo : aller le chercher dans le localStorage pour cet user dans profil
    console.log(choixMemory);

    tailleMemory = 8;
    //todo : aller le chercher dans le localStorage pour cet user dans profil
    console.log(tailleMemory);

    //Remettre à 0 les compteurs
    compteurCoup = 0;
    compteurPair = 0;
    
    document.getElementById("tentezBravo").innerText = "Tentez de gagner avec le moins d'essais possible.";
    dessinerJeu(choixMemory, tailleMemory);
}   

function dessinerJeu(choixMemory, tailleMemory) {
    const nbImage = tailleMemory / 2;
    let i = 0;
    

    const dossier = images.find(v => v.dossier === choixMemory);//trouver choixMemory dans images.js
    console.log(choixMemory, tailleMemory, images);
    do {
        const noRandom = Math.ceil(Math.random() * dossier.longueur);
        if (!arrayMemory.includes(noRandom)) {
            arrayMemory.push(noRandom, noRandom);
            i++;
        }
    } while( i < nbImage );

    arrayMemory.sort( () => Math.random() - 0.5 );


    const table = document.getElementById("memory");
    let cpt =0;
    arrayMemory.forEach(element => {
        const src = `images/${choixMemory}/${element}.${dossier.type}`;//chemin de l'image
        const img = document.createElement("img");
        
        img.setAttribute("src", src);
        img.setAttribute("data-id", element);
        img.setAttribute("id", ++cpt);
        img.setAttribute("name", choixMemory);
        //img.setAttribute("onclick", "javascript:voirImage("+ cpt +");");
        img.setAttribute("class", "visible");
        table.appendChild(img);
    });

    cacherJeu();
}

function cacherJeu(){
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        image.src = "images/question.svg";
    })
}

function voirImage(event) {
    if (!bloquerClick) {
        // todo : flip de l'image
        const image = event.target;
        const dataId = image.getAttribute("data-id");
        const choixMemory = image.getAttribute("name");
        const dossier = images.find(v => v.dossier === choixMemory);//trouver choixMemory dans images.js
        console.log( dataId, choixMemory, dossier.type);

        
        if (!imageComparer1){ // si aucune carte retournée
            image.setAttribute("src", `images/${choixMemory}/${dataId}.${dossier.type}`);//afficher l'image
            imageComparer1 = {image, dataId};
        } else { 
            compteurCoup = ++compteurCoup;
            afficherNbCoup();
            image.setAttribute("src", `images/${choixMemory}/${dataId}.${dossier.type}`); //afficher l'image
            const imageComparer2 = {image, dataId};
            comparaisonImage(imageComparer1, imageComparer2);
        }
    }
} 

function comparaisonImage(image1, image2) {
    if (image1.dataId !== image2.dataId){
        bloquerClick = true;
        setTimeout(() => {
            image1.image.setAttribute("src","images/question.svg");
            image2.image.setAttribute("src","images/question.svg");
            bloquerClick = false;
        }, 2500);
    } else {
        compteurPair = ++compteurPair;
        verifierVictoire();
    }
    imageComparer1 = undefined;
}

function verifierVictoire() {
    if (compteurPair === (tailleMemory / 2)) {
        document.getElementById("tentezBravo").innerText = "Bravo ! Vous avez gagné !";
    }
}

function afficherNbCoup (){
    document.getElementById("nbCoup").innerText = `Nombre de coups : ${compteurCoup}`;
}

//todo: localStorage des scores de user
