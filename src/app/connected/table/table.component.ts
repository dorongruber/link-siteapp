import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserTable } from 'src/app/model/usertable.model';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-table' ,
  templateUrl: './table.component.html' ,
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  title: string;
  url: string;
  htmlModal: HTMLElement;
  flag = false;
  user$: Observable<string>;
  currentUser: {name: string, id: string};
  userTable: UserTable[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.userTable = [];
    console.log('private id -> ');
    this.SetUsertable(this.GetUrlParams());

  }
  showname(category: string, link: string) {

    // console.log('clicked on category,link :', category, link);
  }

  GetUrlParams() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.getAll('id');
      }
      ));
    let tempid: string;
    this.user$.subscribe(res => {
        console.log('res => ', res);
        tempid = res;
      });
    return tempid;
  }

   SetUsertable(id: string) {
   const templist = this.userservice.GetUserTable(id);
   templist.subscribe(res => {
     res.map(category => {
       const catid = category.catid;
       const temp = [];
       category.sites.map(site => {
         temp.push({
           sid: site.sid,
           url: site.url
         });

       });
       // console.log('catid => ', catid);
       // console.log('site -> ', temp);
       this.userTable.push({
         catId: catid,
         sites: temp
       });
     });
   });
   console.log('yser table -> ', this.userTable);
  }

  GetUsertable() {
    return this.userTable;
  }

  openDialog(cat: string, url: string): void {
    console.log('cat, url => ', cat, url);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      height: '90vh',
      data: {title: cat, url}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
    });
  }

  DeleteLink(cid: string, sid: string) {
    const uid = this.GetUrlParams();
    console.log('DeleteLink tablecomponent');
    this.userservice.DeleteLink(cid, sid, uid).subscribe(res => {
      console.log('res ====> ', res);
      if (res) {
        this.userTable.forEach(category => {
          if (category.catId === cid) {
            category.sites = category.sites.filter(s => s.sid !== sid);
            return;
          }
        });
      }
    });
  }

  DeleteEmptyCategory(cid: string) {
    const uid = this.GetUrlParams();
    this.userservice.RemoveCategory(uid, cid).subscribe(res => {
      console.log('removed category : ', res);
      this.userTable = this.userTable.filter(category => category.catId !== cid);
    });

  }

}
