import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StreamService {
  categorysList: any[] = [];
  constructor(private http: HttpClient) {}

  SetCategorysList() {
    this.http.get<{dictonary: any}>('api/sites/allcategorys')
    .pipe(map(data => {
      return data.dictonary.map(cat => {
        return {
          cat: cat.key,
          size: cat.value
        };
      });
    })).subscribe(transformCategorys => {
      // console.log('transformCategorys -> ', transformCategorys);
      transformCategorys.forEach(category => {
        this.categorysList.push({
          catName: category.cat,
          amount: category.size
        });
      });
    });
  }

  GetCategorysList() {
    return this.categorysList;
  }

  GetCategorySites(category: string) {
    return this.http.get<{content: any}>('api/sites/samecategory/' + category)
    .pipe(map(data => {
      return data.content.map(site => {
        return {
          siteurl: site.url,
          siteid: site.id
        };
      });
    }));
  }
}
