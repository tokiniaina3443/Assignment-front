export class Matiere {
  _id?: string;
  nom: string;
  imageMatiere: string;
  prof: string;
  imageProf: string;

  constructor() {
    this.nom = '';
    this.imageMatiere = '';
    this.prof = '';
    this.imageProf = '';
  }
}
