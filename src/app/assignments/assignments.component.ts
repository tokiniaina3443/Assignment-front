import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  showFiller: boolean = false;
  features = ['Hydrodynamic', 'Port & Starboard Attachments', 'Turbo Drive'];
  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit() {}
}
