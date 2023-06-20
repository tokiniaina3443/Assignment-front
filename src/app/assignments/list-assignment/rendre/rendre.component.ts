import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../../assignment.model';

@Component({
  selector: 'app-rendre',
  templateUrl: './rendre.component.html',
  styleUrls: ['./rendre.component.css'],
})
export class RendreComponent implements OnInit {
  assignment: Assignment | undefined;
  noteAssignment: number | undefined;
  remarqueAssignment: string | undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignment = assignment;
    });
  }

  onRendreAssignment() {
    if (!this.assignment || !this.assignment._id || (!this.noteAssignment)|| (!this.remarqueAssignment)) return;
  
    this.assignmentsService
      .rendreAssignment(this.assignment._id, this.noteAssignment, this.remarqueAssignment)
      .subscribe(() => {
        // Handle the successful update here
        console.log('Assignment rendu successfully');
  
        // Redirect to the appropriate page or perform any other action
        // For example, navigate to the home page
        this.router.navigate(['']);
      }, (error) => {
        // Handle the error here
        console.log('Error rendu assignment:', error);
  
        // Show an error message or perform any other action
      });
  }
  
}
