import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  Login(userlog: FormGroup) {
    console.log('userlog -> ', userlog);
    const user = ({
      email: userlog.value.email,
      password: userlog.value.password
    });

    // console.log('user -> ', user);
    this.userservice.LoginUser(user).subscribe(res => {
      console.log('res Login -> ', res.userid);
      this.router.navigate(['../mainpage', {id: res.userid}]);
    });
  }
}
