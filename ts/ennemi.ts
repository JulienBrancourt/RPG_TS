import { Entity } from "./entity.js";
import { Personnage } from "./personnage.js";
import { getRandomInt } from "./utils.js";


export class Ennemi extends Entity {
	private static _count: number = 0;
	private _id: number;

	constructor(niveauHero: number, nom: string = "méchant") {
		super();
        this._id = ++Ennemi._count;
        this.niveau = getRandomInt(niveauHero, 3 + niveauHero);
		this.nom = `${nom}_${this._id}`;
        this.pv = 100 + 2 * this.niveau;
    }
    
    attaque(hero: Personnage): number {
        let forceCoupMechant: number = getRandomInt(1, 20);
        let valeurAttaqueMechant: number = this.niveau + forceCoupMechant;
        let impactAttaqueMechant: number = valeurAttaqueMechant - hero.armure.valeur;
        if (impactAttaqueMechant < 0)
            impactAttaqueMechant = 0;
        return impactAttaqueMechant;
    }
}