import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu?: Date;
  auteurAssignment = '';
  matiereAssignment = '';
  noteAssignment: number | 0 = 0;
  remarqueAssignment = '';
  matieres: Matiere[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchMatieres();
  }
  fetchMatieres() {
    this.http.get<Matiere[]>('http://localhost:8010/api/matieres').subscribe( //need to change later maybe
      (matieres) => {
        this.matieres = matieres;
      },
      (error) => {
        console.log('Error fetching matieres:', error);
      }
    );
  }
  onSubmit() {
    if (!this.nomAssignment || !this.dateDeRendu) {
      return;
    }

    console.log(this.nomAssignment + ' ' + this.dateDeRendu);

    let assignment = new Assignment();
    assignment.nom = this.nomAssignment;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;
    assignment.auteur = this.auteurAssignment;
    assignment.matiere = this.matiereAssignment;
    assignment.note = -1;
    assignment.remarque = "";

    // on utilise le service pour l'ajout
    this.assignmentsService.addAssignment(assignment).subscribe((reponse) => {
      console.log(reponse);

      // on navigue par programmation vers la page d'accueil
      // pour afficher la liste des assignments
      this.router.navigate(['/home']);
    });
  }
}
