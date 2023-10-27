window.onload = init;

let nomUtilisateurCheck = false;
let emailCheck = false;
let mdpCheck = false;
let confirmationMdpCheck = false;

function init(){
    document.getElementById("nomUtilisateur").addEventListener("input", verifierNomUtilisateur);
    document.getElementById("email").addEventListener("input", verifierEmail);
    document.getElementById("mdp").addEventListener("input", verifierMdp);
    document.getElementById("confirmationMdp").addEventListener("input", verifierConfirmationMdp);
    document.getElementById("creationCompte").addEventListener("click", verifierLocalStorage);

}

function verifierNomUtilisateur(event) {
    const nom = event.target.value;
    if (nom.length < 3) {
        document.getElementById("nomUtilisateurInfo").innerText="Choisissez une pseudo contenant au moins 3 caractères."
        document.getElementById("nomUtilisateurImg").setAttribute("src", "images/error.svg");
    } else {
        document.getElementById("nomUtilisateurInfo").innerText=""
        document.getElementById("nomUtilisateurImg").setAttribute("src", "images/check.svg");
        nomUtilisateurCheck = true;
        activerValidation();
    }
}

function verifierEmail(event) {
    const email = event.target.value;
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/.test(email);
    
    if (!patternEmail) {
        document.getElementById("emailInfo").innerText="Rentrer un email valide."
        document.getElementById("emailImg").setAttribute("src", "images/error.svg");
    } else {
        document.getElementById("emailInfo").innerText="";
        document.getElementById("emailImg").setAttribute("src", "images/check.svg");
        emailCheck = true;
        activerValidation();
    }
}

function verifierEmailLocalStorage() {
    const emailDejaUtilise = getProfils().some(e => e.email === email);
    
}

function verifierMdp(event) {
    const mdp = event.target.value;
    
    const contientCaractere = mdp.match(/\W+/g) !== null;
    const contientChiffre = !!mdp.match(/[0-9]/g);
    const longueurMin = mdp.length >= 6;
    const longueurForte = mdp.length >= 9;

    if (!(contientCaractere && contientChiffre && longueurMin)) {
        document.getElementById("mdpImg").setAttribute("src", "images/error.svg");
    } else {
        document.getElementById("mdpImg").setAttribute("src", "images/check.svg");
        mdpCheck = true;
        activerValidation();
    }
    
    // force du mot de passe
    if (longueurMin) {
        document.querySelector("#forceMdp span:nth-child(1)").classList.add('active');
    } else {
        document.querySelector("#forceMdp span:nth-child(1)").classList.remove('active');
    }
    if (longueurMin && (contientChiffre || contientCaractere)) {
        document.querySelector("#forceMdp span:nth-child(2)").classList.add('active');
    } else {
        document.querySelector("#forceMdp span:nth-child(2)").classList.remove('active');
    }
    if (longueurForte && contientChiffre && contientCaractere) {
        document.querySelector("#forceMdp span:nth-child(3)").classList.add('active');
    } else {
        document.querySelector("#forceMdp span:nth-child(3)").classList.remove('active');
    }
    
    // todo : vérifier si la confirmation du mot de passe est toujours bonne
}

function verifierConfirmationMdp(event) {
    const confirmationMdp = event.target.value;
    const mdp = document.getElementById("mdp").value;

    if (confirmationMdp === mdp) {
        document.getElementById("confirmationMdpImg").setAttribute("src", "images/check.svg");
        confirmationMdpCheck = true;
        activerValidation();
    } else {
        document.getElementById("confirmationMdpImg").setAttribute("src", "images/error.svg");
    }
    
}

function activerValidation() {
    //activer le bouton valider si toutes les conditons sont remplies
    if (nomUtilisateurCheck && emailCheck && mdpCheck && confirmationMdpCheck) {
        document.getElementById("creationCompte").disabled = false;
    } else {
        document.getElementById("creationCompte").disabled = true;
    }
}

function getProfils() {
    return JSON.parse(window.localStorage.getItem("profils") ?? "[]");
}

function verifierLocalStorage() {
    const nom = document.getElementById("nomUtilisateur").value;
    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;
    const profilInscription = {nom, email, mdp}
    const updatedProfils = [...getProfils(), profilInscription];

    const nomDejaUtilise = getProfils().some(e => e.nom === nom);
    const emailDejaUtilise = getProfils().some(e => e.email === email);
    if (nomDejaUtilise) {
        alert(`le nom d'utilisateur ${nom} est déjà utilisé. Veuillez saisir un nouveau nom d'utilisateur.`)
    } else if (emailDejaUtilise) {
        alert(`le nom d'utilisateur ${email} est déjà utilisé. Veuillez saisir un nouveau nom d'utilisateur.`)
    } else { // sauvegarder dans le localStorage
        window.localStorage.setItem("profils", JSON.stringify(updatedProfils));
        viderFormulaire();
        window.location.href = "connection.html";
    }
}

function viderFormulaire() {
    document.getElementById("nomUtilisateur").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mdp").value = "";
    document.getElementById("confirmationMdp").value = "";
    document.querySelector("#forceMdp span:nth-child(1)").classList.remove('active')
    document.querySelector("#forceMdp span:nth-child(2)").classList.remove('active')
    document.querySelector("#forceMdp span:nth-child(3)").classList.remove('active')
}
