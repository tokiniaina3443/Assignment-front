import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prof = 'Michel Buffa';

  constructor(private authService:AuthService,
              private assignmentsService:AssignmentsService,
              private router:Router) {}

  login() {
    if(this.authService.loggedIn) {
      this.authService.logOut();
    } else {
      this.authService.logIn();
    }
  }

  remplirBD() {
    this.assignmentsService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      console.log("TOUS LES INSERTS EFFECTUES");
      // et on affiche la liste des assignments
      this.router.navigate(['/home']);
    })
  }
}
