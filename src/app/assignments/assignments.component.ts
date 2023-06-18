import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Application de gestion des assignments';
  boutonActif = false;
  assignmentSelectionne?: Assignment;

  // pagination
  page: number = 1;
  limit: number = 10;
  totalDocs = 0;
  totalPages = 0;
  hasPrevPage = false;
  prevPage = false;
  hasNextPage = false;
  nextPage = false;

  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {
    console.log('avant affichage du composant !');
    this.getAssignments();
  }

  getAssignments() {
    // On demande la liste des assignments au service
    this.assignmentsService
      .getAssignmentsAvecPagination(this.page, this.limit)
      .subscribe((data) => {
        console.log('Données arrivés !');
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalPages = data.totalPages;
        this.totalDocs = data.totalDocs;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
      });
    console.log('données demandées');
  }
  onDeleteAssignment() {
    if (!this.assignmentSelectionne) {
      return;
    }

    console.log(
      "Suppression de l'assignment : " + this.assignmentSelectionne.nom
    );

    this.assignmentsService
      .deleteAssignment(this.assignmentSelectionne)
      .subscribe((message) => {
        console.log(message);
      });
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  paginator(event: any) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }
}
