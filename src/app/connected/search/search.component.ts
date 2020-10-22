import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StreamService } from 'src/app/services/stream.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search' ,
  templateUrl: './search.component.html' ,
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  selcat: string;
  sites: string[] = [];
  sitesfromcategory: any[] = [];
  categorys: any[] = [];
  userId$: Observable<string>;
  uId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryservice: StreamService,
    private userservice: UserService
    ) { }

  ngOnInit() {

    this.userId$ = this.route.paramMap.pipe(
      switchMap(params => {
        return params.getAll('id');
      })
    );
    this.userId$.subscribe(res => {
      this.uId = res;
    });

    this.GetCategorys();
  }

  async SelectedCategory(name: string) {
    this.sitesfromcategory = [];
    this.selcat = name;
    const templist = await this.categoryservice.GetCategorySites(this.selcat).toPromise();
    templist.forEach(site => {
      this.sitesfromcategory.push({
        url: site.siteurl,
        id: site.siteid
      });
    });
  }

  AddSite(site: any) {
    // console.log('AddSiteToUser ----------');
    // console.log('site info -> ', site);
    // console.log('user id -> ', this.uId);
    // console.log('category id -> ', this.selcat);
    this.userservice.AddSiteToUser(site, this.uId, this.selcat);
  }

  GetCategorys() {
    let templist: any[] = [];
    templist = this.categoryservice.GetCategorysList();
    templist.forEach(category => {
      this.categorys.push({
        title: category.catName,
        amount: category.amount
      });
    });
  }

}
