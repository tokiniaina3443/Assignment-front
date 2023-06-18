import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // déclaration des attributs HTML custom du composant
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // exemple de récupération de query params
    // tester avec URL http://localhost:4200/assignments/1?debug=true&niveau=2#debut
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);

    // exemple de récupération de fragment
    const fragment = this.route.snapshot.fragment;
    console.log(fragment);

    // on va récupére l'id dans la route (dans l'URL)
    // Le + force la conversion en nombre (par defaut c'est de type string)
    const id: number = +this.route.snapshot.params['id'];

    console.log('id : ' + id + ' type ' + typeof id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log('Assignment mis à jour !');

          // on navigue vers la liste
          this.router.navigate(['/home']);
        });
    }
  }

  onDelete() {
    if (this.assignmentTransmis) {
      this.assignmentsService
        .deleteAssignment(this.assignmentTransmis)
        .subscribe((message) => {
          console.log(message);
          // Pour cacher l'affichage du détail
          this.assignmentTransmis = undefined;

          // on navigue vers la liste
          this.router.navigate(['/home']);
        });
    }
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
