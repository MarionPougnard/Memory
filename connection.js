window.onload = init;

let emailCheck = false;
let mdpCheck = false;

function init(){
    document.getElementById("emailConnection").addEventListener("blur", verifierEmail);
    document.getElementById("mdpConnection").addEventListener("blur", verifierMdp);
    document.getElementById("seConnecter").addEventListener("click", verifierLocalStorage);
}

function verifierEmail(event) {
    const email = event.target.value;
    const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/.test(email);
    
    if (!patternEmail) {
        alert("Erreur, veuillez saisir un email valide");
    } else {
        emailCheck = true;
        console.log(emailCheck);
        activerValidation();
    }
}

function verifierMdp(event) {
    const mdp = event.target.value;
    
    const contientCaractere = mdp.match(/\W+/g) !== null;
    const contientChiffre = !!mdp.match(/[0-9]/g);
    const longueurMin = mdp.length >= 6;
    const longueurForte = mdp.length >= 9;

    if (!(contientCaractere && contientChiffre && longueurMin)) {
        alert("Erreur, votre mot de passe doit contenir au moins un symbole, un chiffre, ainsi que 6 caractères minimum");
    } else {
        mdpCheck = true;
        console.log(mdpCheck);
        activerValidation();
    }
}

function activerValidation() {
    //activer le bouton valider si toutes les conditons sont remplies
    if (emailCheck && mdpCheck ) {
        document.getElementById("seConnecter").disabled = false;
    } else {
        document.getElementById("seConnecter").disabled = true;
    }
}

function getProfils() {
    return JSON.parse(window.localStorage.getItem("profils") ?? "[]");
}

function verifierLocalStorage() {
    const email = document.getElementById("emailConnection").value;
    const mdp = document.getElementById("mdpConnection").value;
    const emailDansLocalStorage = getProfils().some(e => e.email === email);
    const mdpCorrespondant = getProfils().find(e => e.email === email).mdp;
    const nomUtilisateurCorrespondant = getProfils().find(e => e.email === email).nom;
    const userConnecter = [{nomUtilisateurCorrespondant, email}];

    if (!emailDansLocalStorage || (mdp !== mdpCorrespondant)) {
        alert("Erreur, votre email ou mot de passe n'existe pas")
    } else {
        alert(`l'email ${email} est connecté`);
        window.localStorage.setItem("user", JSON.stringify(userConnecter));
        window.location.href = "Profil.html";
    }
}
