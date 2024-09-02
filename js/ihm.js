import { Arme } from "./arme.js";
import { Armure } from "./armure.js";
import { Ennemi } from "./ennemi.js";
import { Personnage } from "./personnage.js";
export class Partie {
    run() {
        this.hero = this.creerHero();
        let partyContinue = true;
        while (partyContinue) {
            partyContinue = this.rencontrerDesMechants();
        }
        alert("GAME OVER !");
    }
    creerHero() {
        let nomPerso = prompt("Saisir le nom : ");
        let classe = prompt("Veuillez choisir une classe : (attaquant/défenseur)");
        let epee;
        let cuir;
        if (classe === "attaquant") {
            epee = new Arme("Hache de barbare", 5);
            cuir = new Armure("pagne de cuir de cochon d'inde", 1);
        }
        else {
            epee = new Arme("Aiguille à tricoter trempé dans du vinaigre balsamique", 2);
            cuir = new Armure("armure de cuir et de fer", 5);
        }
        return new Personnage(nomPerso, epee, cuir);
    }
    rencontrerDesMechants() {
        let ennemi = new Ennemi(this.hero.niveau);
        let combattre = confirm(`voulez-vous combattre ${ennemi.nom}, il est de niveau ${ennemi.niveau}`);
        if (combattre) {
            let nbrCoups = 0;
            while (ennemi.pv > 0 && this.hero.pv > 0) {
                // Hero attaque
                let valeurAttaqueHero = this.hero.attaque();
                ennemi.pv -= valeurAttaqueHero;
                nbrCoups++;
                console.error(`${this.hero.nom} attaque à ${valeurAttaqueHero}   il lui reste ${ennemi.pv}`);
                // Si on a tué le méchant
                if (ennemi.pv <= 0) {
                    this.hero.xpManager(ennemi.niveau, nbrCoups);
                    break;
                }
                // Le méchant attque
                let valeurAttaqueMechant = ennemi.attaque(this.hero);
                this.hero.pv -= valeurAttaqueMechant;
                console.warn(`${ennemi.nom} attaque à ${valeurAttaqueMechant} il vous reste ${this.hero.pv}`);
            }
            if (this.hero.pv <= 0) {
                alert(`AAaaaaaahhhhhh ..! Combat avec ${ennemi.nom} de niveau ${ennemi.niveau} terminé en ${nbrCoups} coups. \nIl vous reste ${this.hero.pv}pv, vous étiez au niveau ${this.hero.niveau} et aviez ${this.hero.xp}xp.`);
                return false;
            }
            else {
                alert(`Combat avec ${ennemi.nom} de niveau ${ennemi.niveau} terminé en ${nbrCoups} coups. \nIl vous reste ${this.hero.pv}pv, vous êtes niveau ${this.hero.niveau} et avez ${this.hero.xp}xp.`);
                return true;
            }
        }
        else {
            alert(`Vous fuyez au niveau ${this.hero.niveau}`);
            return true;
        }
    }
}
