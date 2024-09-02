import { Entity } from "./entity.js";
import { getRandomInt } from "./utils.js";
export class Personnage extends Entity {
    constructor(nom, arme, armure, xp = 0, pv = 100, niveau = 1) {
        super();
        this.nom = nom;
        this.xp = xp;
        this.pv = pv;
        this.arme = arme;
        this.armure = armure;
        this.niveau = niveau;
    }
    xpManager(ennemiNiveau, nbrCoups) {
        let xpGagne = this.calculateXp(ennemiNiveau, nbrCoups);
        this.addXp(xpGagne);
    }
    calculateXp(ennemiNiveau, nbrCoups) {
        return Math.floor(100 * ennemiNiveau * (12 / nbrCoups));
    }
    addXp(combatXp) {
        this.xp += combatXp;
        let niveauGagne = Math.floor(this.xp / 100);
        this.niveau += niveauGagne;
        this.pv += 6 * niveauGagne;
        this.xp = this.xp % 100;
    }
    attaque() {
        let forceCoupHero = getRandomInt(1, 20);
        let resultatAleatoire = getRandomInt(1, 5);
        if (resultatAleatoire === 5) {
            forceCoupHero *= 2;
        }
        else if (resultatAleatoire === 1) {
            forceCoupHero = Math.floor(forceCoupHero / 2);
        }
        return forceCoupHero + this.niveau + this.arme.valeur;
    }
}
