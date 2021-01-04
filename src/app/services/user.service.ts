import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const URL = 'api/user/';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  RegisterUser(user: any) {
    console.log('RegisterUser -> ', user);
    return this.http.post<{message: boolean}>(`${URL}registration`, user);
  }

  LoginUser(loguser: any) {
    console.log('user UserService -> ', loguser);
    return this.http.post<{userid: string}>(`${URL}login`, loguser);
  }

  AddSiteToUser(site: any, uId: string, cId: string) {
    const siteInfo = ({
      sid: site.id,
      url: site.url,
      cid: cId,
      uid: uId
    });
    console.log('siteInfo -> ', siteInfo);
    this.http.post<{message: string, state: boolean}>(`${URL}addcontent`, siteInfo).subscribe(res => {
      console.log('AddSiteToUser res => ', res);
    });
  }

 GetUserTable(uId: string) {
  return this.http.get <
    {categorys: [{_id: string, catid: string, sites: [{siteid: string, url: string}]} ]}
    > (`${URL}usertable/` + uId)
    .pipe(map(data => {
      return data.categorys.map(cat => {
        return {
          catid: cat.catid,
          sites: cat.sites.map(site => {
            return {
              sid: site.siteid,
              url: site.url,
            };
          })
        };
      });

    }));
 }

 GetUserInfo(uid: string) {
  return this.http.get<{name: string}>(`${URL}currentuser/` + uid);
 }

 DeleteLink(cid: string, sid: string, uid: string) {
   console.log('DeleteLink userservice');
   return this.http.delete(`${URL}link/${cid}/${sid}/${uid}`);
 }

 RemoveCategory(uid: string, cid: string) {
   return this.http.delete(`${URL}category/${uid}/${cid}`);
 }

}
