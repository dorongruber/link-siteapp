import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.navigate(['/connect/login']);
  }

  prepareRoute(outlet: RouterOutlet) {
    // console.log(';out ====> ', outlet.activatedRouteData.animation);
    return outlet && outlet.activatedRouteData &&
     outlet.activatedRouteData.animation;
  }

}
