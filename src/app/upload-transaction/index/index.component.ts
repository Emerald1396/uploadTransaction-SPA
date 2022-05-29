import { Data, FileUploadRequestModel, lstTransactionDetail, SaveTxnDetailRequestModel, TransactionHistoryResponseModel } from './../model/transaction.model';
import { UploadService } from './../upload.service';
import { Transaction } from './../transaction';
import { Component, OnInit } from '@angular/core';
import { TransactionFilterRequestModel } from '../model/transaction.model';
import { FormControl, FormGroup } from '@angular/forms';
import * as _moment from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ElementSchemaRegistry } from '@angular/compiler';

interface Currenty {
  value: string;
  viewValue: string;
}

interface Status {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  TransactionID: string;
  Payment: string;
  Status: string;
}

var ELEMENT_DATA: Transaction[] = [];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  currency: Currenty[] = [
    {value: '0', viewValue: 'USD'},
    {value: '1', viewValue: 'EUR'}
  ];

  status: Status[] = [
    {value: '0', viewValue: 'A'},
    {value: '1', viewValue: 'R'},
    {value: '1', viewValue: 'D'}
  ];

  displayedColumns: string[] = ['TransactionID', 'Payment', 'Status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  transactions: Transaction[] = [];
  filterModel!: TransactionFilterRequestModel;
  fileUploadModel!: FileUploadRequestModel;
  file!: File;
  loading: boolean = false;
  validFile: boolean = false;
  showErr: boolean =false;
  fileByteArray: any[] = [];
  detailTxnInfo!: Data;
  errMessage!: string;
  lstTran: lstTransactionDetail[] = [];
  model:any;
  date = new FormControl(new Date());
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());

  currencyValue!: string;
  statusValue!: string;
  startDate!: Date | null;
  endDate!: Date | null;

  myGroup = new FormGroup({
    start: new FormControl(''),
    enddate: new FormControl('')
  });

  constructor(public uploadService: UploadService) { }

  ngOnInit(): void {
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource();
    this.currencyValue = "";
    this.statusValue = "";
    this.startDate = new Date();
    this.endDate = new Date()
    var reqmodel = new TransactionFilterRequestModel();
    reqmodel.startDate = this.startDate;
    reqmodel.endDate = this.endDate;
    reqmodel.currency = this.currencyValue;
    reqmodel.status = this.statusValue;
    this.uploadService.getAllTransactionByFilter(reqmodel).subscribe((data: TransactionHistoryResponseModel)=>{
      if (data.RespCode == "000") {
          data.Data.lstTransactionHistory.forEach(t => {
          ELEMENT_DATA.push(t);
        })
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    })
     
  }

  getAllTransction(model: TransactionFilterRequestModel){
    this.uploadService.getAllTransactionByFilter(model).subscribe((data: TransactionHistoryResponseModel)=>{
      if (data.RespCode == "000") {
        data.Data.lstTransactionHistory.forEach(t => {
          ELEMENT_DATA.push(t);
        })
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    })
  }

  onChange(e: any){
    console.log(this.file);
    this.showErr =false;
    this.detailTxnInfo = new Data;
    this.file = e.target.files[0];

    if (this.file.size == 0) {
      return;
    }

    const formData = new FormData();
    formData.append(this.file.name,this.file);

    this.uploadService.postFile(formData).subscribe(res => {
      var txnRes = res
      console.log(txnRes);
      if (txnRes.RespCode =="000") {
        this.detailTxnInfo = txnRes.Data;
        console.log(this.detailTxnInfo);
        this.validFile = true;
      }
      else{
        this.validFile = false;
        this.showErr =true;
        this.errMessage = txnRes.RespDescription;
      }

    })
  }

  onUpload() {
    this.validFile = false;
    ELEMENT_DATA = [];
    this.dataSource = new MatTableDataSource();
    console.log(this.detailTxnInfo);
    if (this.detailTxnInfo.lstTransactionDetailReview.length > 0) {
      this.detailTxnInfo.lstTransactionDetailReview.forEach(element => {
        this.lstTran.push(element)
      });
      var reqmodel = new SaveTxnDetailRequestModel();
      reqmodel.lstTransactionDetail = this.lstTran;
      console.log(reqmodel);
    this.uploadService.saveAllTransacionRecords(reqmodel).subscribe(res =>
      {
        this.validFile = false;
        console.log(res.RespCode);
        if(res.RespCode == "000")
        {
          this.currencyValue = "";
          this.statusValue = "";
          this.startDate = new Date();
          this.endDate = new Date()
          console.log("tocu")
          var reqmodel = new TransactionFilterRequestModel();
          reqmodel.startDate = this.startDate;
          reqmodel.endDate = this.endDate;
          reqmodel.currency = this.currencyValue;
          reqmodel.status = this.statusValue;
          console.log(reqmodel);
          this.getAllTransction(reqmodel);
          window.location.reload();
        }else{
          this.showErr =true;
          this.errMessage = res.RespDescription;
        }
      }
    );
    }
  }

  changeCurrency(value: any){
    console.log(value);
    this.currencyValue = value;
    console.log(this.currencyValue);
  }

  changeStatus(value: any){
    this.statusValue = value;
    console.log(this.statusValue);
  }

  addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    
    console.log(event.value)
  }

  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate =event.value;
    console.log(event.value)
  }

  date1(value: any){
    this.startDate = value;
    console.log(this.startDate);
  }

  date2(value: any){
    this.endDate = value;
    console.log(this.endDate);
  }

  onFilter(){
    ELEMENT_DATA = [];
    var reqmodel = new TransactionFilterRequestModel();
    reqmodel.startDate = this.startDate ;
    reqmodel.endDate = this.endDate;
    reqmodel.currency = this.currencyValue;
    reqmodel.status = this.statusValue;
    console.log(reqmodel);
    this.uploadService.getAllTransactionByFilter(reqmodel).subscribe(res=>{
      if (res.RespCode == "000") {
        console.log(res);
        res.Data.lstTransactionHistory.forEach(t => {
          ELEMENT_DATA.push(t);
        })
        console.log(ELEMENT_DATA);
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        console.log(this.dataSource);
      }
    }) 
  }

// selectToday() {
//   this.model = this.calendar.getToday();
// }
}

