import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-list-assignment',
  templateUrl: './list-assignment.component.html',
  styleUrls: ['./list-assignment.component.css'],
})
export class ListAssignmentComponent implements OnInit {
  page: number = 0;
  length: number = 0;
  pageSize: number = 10;

  docs: any;
  constructor(
    private dialog: Dialog,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

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

  loadData() {
    this.assignmentsService
      .getAssignmentsAvecPagination(this.page, this.pageSize)
      .subscribe((response) => {
        console.log(response);
        this.docs = response.docs;
        this.length = response.totalDocs;
      });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = this.pageSize;
    this.loadData();
  }

  onDelete(assignmentId: string) {
    this.assignmentsService
      .deleteAssignmentByID(assignmentId)
      .subscribe((message) => {
        console.log(message);
        this.loadData();
      });
  }

  isAdmin() {
    return true;
  }
}
