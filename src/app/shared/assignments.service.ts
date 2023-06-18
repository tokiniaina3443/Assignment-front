import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

import { bdInitialAssignments } from './data';
@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id: 1,
      nom: 'Devoir Angular de Mr Buffa',
      dateDeRendu: new Date('2022-01-10'),
      rendu: false,
    },
    {
      id: 2,
      nom: 'Devoir Grails de Mr Galli',
      dateDeRendu: new Date('2022-12-10'),
      rendu: true,
    },
    {
      id: 3,
      nom: 'Devoir IOS de Mr Amosse',
      dateDeRendu: new Date('2022-09-15'),
      rendu: true,
    },
  ];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  URI = 'http://localhost:8010/api/assignments';
  //URI = 'https://marrakechback2023.herokuapp.com/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    // renvoie un objet observable
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.URI);
  }

  getAssignmentsAvecPagination(page:number, limit:number): Observable<any> {
    // renvoie un objet observable
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.URI + "?page=" + page + "&limit=" + limit);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // renvoie un objet observable
    //return of(this.assignments.find(assignment => assignment.id === id));
    return this.http.get<Assignment>(this.URI + '/' + id)
    .pipe(
      map((a) => {
        a.nom += ' TRANSFORME PAR UN PIPE !';
        return a;
      }),
      catchError(
        this.handleError<any>(
          '### catchError: getAssignments by id avec id=' + id
        )
      )
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // on génère un id aléatoire
    assignment.id = Math.floor(Math.random() * 10000000000000000);
    //this.assignments.push(assignment);
    return this.http.post<Assignment>(this.URI, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // rien besoin de faire, pour le moment, on ne fait que modifier
    // rendu à vrai/faux avec la checkbox du composant de detail
    return this.http.put<Assignment>(this.URI, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<string> {
    /*
    const pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);
*/
    this.loggingService.log(assignment.nom, 'supprimé !');

    return this.http.delete<string>(this.URI + '/' + assignment._id);

    //return of("Assignment supprimé !");
  }

  // version naive
  peuplerBD() {
    bdInitialAssignments.forEach((assignmentGenere) => {
      let a = new Assignment();
      a.id = assignmentGenere.id;
      a.nom = assignmentGenere.nom;
      a.dateDeRendu = new Date(assignmentGenere.dateDeRendu);
      a.rendu = assignmentGenere.rendu;

      this.addAssignment(a)
      .subscribe((reponse) => {
        console.log(reponse);
      });
    });
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

}
