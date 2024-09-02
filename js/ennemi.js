import { Entity } from "./entity.js";
import { getRandomInt } from "./utils.js";
export class Ennemi extends Entity {
    constructor(niveauHero, nom = "méchant") {
        super();
        this._id = ++Ennemi._count;
        this.niveau = getRandomInt(niveauHero, 3 + niveauHero);
        this.nom = `${nom}_${this._id}`;
        this.pv = 100 + 2 * this.niveau;
    }
    attaque(hero) {
        let forceCoupMechant = getRandomInt(1, 20);
        let valeurAttaqueMechant = this.niveau + forceCoupMechant;
        let impactAttaqueMechant = valeurAttaqueMechant - hero.armure.valeur;
        if (impactAttaqueMechant < 0)
            impactAttaqueMechant = 0;
        return impactAttaqueMechant;
    }
}
Ennemi._count = 0;
