import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonrenduDirective } from './shared/nonrendu.directive';

import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';

import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ListAssignmentComponent } from './assignments/list-assignment/list-assignment.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailDialogComponent } from './assignments/list-assignment/detail-dialog/detail-dialog.component';
import { Dialog, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: AssignmentsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ListAssignmentComponent,
      },
      {
        path: 'add',
        component: AddAssignmentComponent,
      },
      {
        path: 'edit/:id',
        component: EditAssignmentComponent,
      },
    ],
  },
  { path: 'assignments/:id', component: AssignmentDetailComponent },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonrenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AuthComponent,
    ListAssignmentComponent,
    DetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    CdkListbox,
    CdkOption,
    CdkMenu,
    CdkMenuItem,
    CdkDrag,
    CdkDropList,
    MatGridListModule,
    DialogModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
