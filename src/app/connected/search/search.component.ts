import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StreamService } from 'src/app/services/stream.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-search' ,
  templateUrl: './search.component.html' ,
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  title: string;
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
    private userservice: UserService,
    public dialog: MatDialog
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

  openDialog(url: string): void {
    console.log('cat, url => ', this.selcat, url);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      height: '90vh',
      data: {title: this.selcat, url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
    });
  }

}
