import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../style/formstyle.css',
'./register.component.css']
})

export class RegisterComponent {

  hide = true;
  state = true;
  register = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private userservice: UserService
  ) {}

  Registration(formuser: FormGroup) {
    // console.log('Registration -> ', formuser);
    const newuser: any = [];
    newuser.push({
      name: formuser.value.name,
      phone: formuser.value.phone,
      email: formuser.value.email,
      password: formuser.value.password
    });
    this.userservice.RegisterUser(newuser).subscribe(res => {
      this.state = res.message;
    });

    this.router.navigate(['/connect/login']);
  }

  test() {
    this.router.navigate(['/connect/login']);
  }

}
