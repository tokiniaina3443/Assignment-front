import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu?: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.nomAssignment || !this.dateDeRendu) {
      return;
    }

    console.log(this.nomAssignment + ' ' + this.dateDeRendu);

    let assignment = new Assignment();
    assignment.nom = this.nomAssignment;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;

    // on utilise le service pour l'ajout
    this.assignmentsService.addAssignment(assignment).subscribe((reponse) => {
      console.log(reponse);

      // on navigue par programmation vers la page d'accueil
      // pour afficher la liste des assignments
      this.router.navigate(['/home']);
    });
  }
}
