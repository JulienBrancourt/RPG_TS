import { Arme } from "./arme.js";
import { Armure } from "./armure.js";
import { Entity } from "./entity.js";
import { getRandomInt } from "./utils.js";

export class Personnage extends Entity {
	xp: number;
	arme: Arme;
	armure: Armure;

	constructor(
		nom: string,
		arme: Arme,
		armure: Armure,
		xp: number = 0,
		pv: number = 100,
		niveau: number = 1
	) {
		super();
		this.nom = nom;
		this.xp = xp;
		this.pv = pv;
		this.arme = arme;
		this.armure = armure;
		this.niveau = niveau;
	}

	xpManager(ennemiNiveau: number, nbrCoups: number): void {
		let xpGagne: number = this.calculateXp(ennemiNiveau, nbrCoups);
		this.addXp(xpGagne);
	}

	calculateXp(ennemiNiveau: number, nbrCoups: number): number {
		return Math.floor(100 * ennemiNiveau * (12 / nbrCoups));
	}

	addXp(combatXp: number): void {
		this.xp += combatXp;
		let niveauGagne: number = Math.floor(this.xp / 100);

		this.niveau += niveauGagne;
		this.pv += 6 * niveauGagne;
		this.xp = this.xp % 100;
	}

	attaque(): number {
		let forceCoupHero: number = getRandomInt(1, 20);
		let resultatAleatoire: number = getRandomInt(1, 5);
		if (resultatAleatoire === 5) {
			forceCoupHero *= 2;
		} else if (resultatAleatoire === 1) {
			forceCoupHero = Math.floor(forceCoupHero / 2);
		}
		return forceCoupHero + this.niveau + this.arme.valeur;
	}
}