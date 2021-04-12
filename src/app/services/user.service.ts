import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

<<<<<<< HEAD
// const URI = 'https://rocky-fjord-19882.herokuapp.com/api/user/';
const URI = 'http://localhost:3000/api/user/';
=======

const URL = 'api/user/';

>>>>>>> master

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  RegisterUser(user: any) {
    console.log('RegisterUser -> ', user);
<<<<<<< HEAD
    return this.http.post<{message: boolean}>(`${URI}registration`, user);
=======
    return this.http.post<{message: boolean}>(`${URL}registration`, user);
>>>>>>> master
  }

  LoginUser(loguser: {email: string, password: string}) {
    console.log('user UserService -> ', loguser);
<<<<<<< HEAD
    return this.http.post<{userid: string}>(`${URI}login`, loguser);
=======
    return this.http.post<{userid: string}>(`${URL}login`, loguser);
>>>>>>> master
  }

  AddSiteToUser(site: any, uId: string, cId: string) {
    const siteInfo = ({
      sid: site.id,
      url: site.url,
      cid: cId,
      uid: uId
    });
    console.log('siteInfo -> ', siteInfo);
<<<<<<< HEAD
    this.http.post<{message: string, state: boolean}>(`${URI}addcontent`, siteInfo).subscribe(res => {
=======
    this.http.post<{message: string, state: boolean}>(`${URL}addcontent`, siteInfo).subscribe(res => {
>>>>>>> master
      console.log('AddSiteToUser res => ', res);
    });
  }

 GetUserTable(uId: string) {
  return this.http.get <
    {categorys: [{_id: string, catid: string, sites: [{siteid: string, url: string}]} ]}
<<<<<<< HEAD
    > (`${URI}usertable/${uId}`)
=======
    > (`${URL}usertable/` + uId)
>>>>>>> master
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
<<<<<<< HEAD
  return this.http.get<{name: string}>(`${URI}currentuser/${uid}`);
=======
  return this.http.get<{name: string}>(`${URL}currentuser/` + uid);
>>>>>>> master
 }

 DeleteLink(cid: string, sid: string, uid: string) {
   console.log('DeleteLink userservice');
<<<<<<< HEAD
   return this.http.delete(`${URI}link/${cid}/${sid}/${uid}`);
 }

 RemoveCategory(uid: string, cid: string) {
   return this.http.delete(`${URI}category/${uid}/${cid}`);
=======
   return this.http.delete(`${URL}link/${cid}/${sid}/${uid}`);
 }

 RemoveCategory(uid: string, cid: string) {
   return this.http.delete(`${URL}category/${uid}/${cid}`);
>>>>>>> master
 }

}
