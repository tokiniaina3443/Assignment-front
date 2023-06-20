import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../matiere.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment: string = '';
  dateDeRendu!: Date;
  auteurAssignment: string = '';
  noteAssignment: number | 0 = 0;
  matiereAssignment = '';
  remarqueAssignment: string = '';
  matieres: Matiere[] = [];
  baseUrl = environment.apiUrl;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.fetchMatieres();
  }
  fetchMatieres() {
    this.http.get<Matiere[]>(this.baseUrl + '/matieres').subscribe(
      //need to change later maybe
      (matieres) => {
        this.matieres = matieres;
      },
      (error) => {
        console.log('Error fetching matieres:', error);
      }
    );
  }
  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.matiereAssignment =
        assignment.matiere == null ? '' : assignment.matiere;
      this.auteurAssignment =
        assignment.auteur == null ? '' : assignment.auteur;
      this.noteAssignment = -1;
      this.remarqueAssignment = '';
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.auteurAssignment;
    this.assignment.matiere = this.matiereAssignment;
    this.assignment.note = -1;
    this.assignment.remarque = '';

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['']);
      });
  }
}
