import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  showFiller: boolean = false;
  features = ['Hydrodynamic', 'Port & Starboard Attachments', 'Turbo Drive'];
  constructor(
    private assignmentsService: AssignmentsService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  logOut() {
    this.localStorage.remove('token');
    this.router.navigate(['/login']);
  }
}
