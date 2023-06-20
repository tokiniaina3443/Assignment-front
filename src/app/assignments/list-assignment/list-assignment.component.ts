import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css'],
})
export class ListAssignmentComponent {
  todo = [1, 2, 3, 4];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(
    private dialog: Dialog,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openDialog() {
    this.dialog.open(DetailDialogComponent, {
      minWidth: '300px',
      data: {
        animal: 'panda',
      },
    });
  }

  onDelete(assignmentId: string) {
    this.assignmentsService
      .deleteAssignmentByID(assignmentId)
      .subscribe((message) => {
        console.log(message);
      });
  }

  isAdmin() {
    return true;
  }
}
