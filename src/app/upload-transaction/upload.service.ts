import { Transaction } from './transaction';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiResponseModel, FileUploadRequestModel, FileUploadResponseModel, lstTransactionDetail, SaveTxnDetailRequestModel, TransactionFilterRequestModel, TransactionHistoryResponseModel } from './model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiURL = "https://localhost:44359/API/Transaction/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  postFile(formData: FormData):Observable<FileUploadResponseModel>{
    return this.httpClient.post<FileUploadResponseModel>(this.apiURL + 'PostFile' ,formData)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  uploadFile(fileModel: FileUploadRequestModel):Observable<Transaction[]>{

    return this.httpClient.post<Transaction[]>(this.apiURL + 'UploadValidFile' ,JSON.stringify(fileModel), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllTransactionByFilter(filterRequestModel: TransactionFilterRequestModel): Observable<TransactionHistoryResponseModel>{

    return this.httpClient.post<TransactionHistoryResponseModel>(this.apiURL + 'GetTransactionListByFilter' ,JSON.stringify(filterRequestModel), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  saveAllTransacionRecords(lstTransactionDetail:SaveTxnDetailRequestModel): Observable<apiResponseModel> {

    console.log(JSON.stringify(lstTransactionDetail));

    return this.httpClient.post<apiResponseModel>(this.apiURL + 'SaveTransactionHistory', JSON.stringify(lstTransactionDetail), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    );
  }  

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
