import { Transaction } from './../transaction';

export class TransactionFilterRequestModel {
    startDate!: Date | null;
    endDate!: Date | null;
    currency!: string;
    status!: string;
}

export class FileUploadRequestModel {
    fileName!: string;
    fileSize!: number;
    fileContent!: any[];
}

export class FileUploadResponseModel {
    RespCode!: string;
    RespDescription!: string;
    Data!: Data;
}
export class Data {
    lstTransactionDetailReview!: lstTransactionDetail[];
}

export class lstTransactionDetail{
    Amount!: string;
    CurrencyCode!: string;
    Status!: string;
    TransactionDate!: string;
    TransactionID!: string;
}

export class apiResponseModel{
    RespCode!: string;
    RespDescription!: string;
}

export class SaveTxnDetailRequestModel {
    lstTransactionDetail!: lstTransactionDetail[];
}

export class TransactionHistoryResponseModel {
    RespCode!: string;
    RespDescription!: string;
    Data!: HistroyData;
}
export class HistroyData {
    lstTransactionHistory!: Transaction[];
}


