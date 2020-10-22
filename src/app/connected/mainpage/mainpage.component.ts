import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StreamService } from 'src/app/services/stream.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mainpage' ,
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit {
  user: string;
  userId$: Observable<string>;
  uId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private streamservice: StreamService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    console.log('mainpage');
    this.userId$ = this.route.paramMap.pipe(
      switchMap(params => {
        return params.getAll('id');
      })
    );
    this.userId$.subscribe(res => {
      this.uId = res;
    });
    const temp = this.userservice.GetUserInfo(this.uId);
    temp.subscribe(res => {
      this.user = res.name;
    });
    this.streamservice.SetCategorysList();
    this.router.navigateByUrl(`/mainpage/private/${this.uId}`);

  }
}
