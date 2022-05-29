import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadTransactionRoutingModule } from './upload-transaction-routing.module';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatSelectModule  } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    UploadTransactionRoutingModule,
    NgbModule,
    FormsModule,
    MatDatepickerModule,MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule
  ]
})
export class UploadTransactionModule { }
