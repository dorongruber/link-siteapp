import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { ConnectedRoutingModule } from './connected-routing.module';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { SafePipe } from './pipe/safepipe';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MainpageComponent,
    TableComponent,
    DialogComponent,
    SafePipe,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ConnectedRoutingModule
  ],
  entryComponents: [DialogComponent]
})
export class ConnectedModule {}
