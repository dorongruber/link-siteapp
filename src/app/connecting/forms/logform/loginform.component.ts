import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-logform',
  templateUrl: './loginform.component.html',
  styleUrls: ['../../../style/formstyle.css',
'./loginform.component.css']
})

export class LogformComponent {
  hide = true;
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userservice: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  Login(userlog: FormGroup) {
    console.log('userlog -> ', userlog);
    const user = ({
      email: userlog.value.email,
      password: userlog.value.password
    });

    // console.log('user -> ', user);
    this.userservice.LoginUser(user).subscribe(res => {
      if (res.userid === 'error') {
        this.snackBar.open('invalide username/password pair ', 'close', {
          duration: 2500,
          panelClass: 'mat-snack-bar-handset',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        this.router.navigate(['../mainpage', {id: res.userid}]);
      }


    });
  }
}
