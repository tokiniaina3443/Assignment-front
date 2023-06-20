import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css'],
})
export class DetailDialogComponent implements OnInit {
  assignmentId: number;
  assignment: any;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignmentId = +this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    this.assignmentsService
      .getAssignment(this.assignmentId)
      .subscribe((response) => {
        this.assignment = response;
      });
  }
}
