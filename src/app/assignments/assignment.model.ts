export class Assignment {
  _id?: string;
  id!: number;
  nom!: string;
  dateDeRendu!: Date;
  dateReelDeRendu?: Date;
  rendu!: boolean;
  auteur?: string;
  matiere?: string;
  note?: number;
  remarque?: string;
}
