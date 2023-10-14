import { Observable } from 'rxjs'; //reactive x

interface Account {
  accountId: string;
  accountNumber: string;
  bankId: string;
  bankName: string;
  ownerName: string;
  createdAt: string;
}

export interface RegisterPixKeyRpcResponse {
  id: string;
  kind: string;
  key: string;
  account: Account;
  createdAt: string;
}

export interface PixKeyClientGrpc {
  registerPixKey: (data: {
    kind: string;
    key: string;
    accountId: string;
  }) => Observable<{ id: string; status: string; error: string }>;
  find: (data: {
    kind: string;
    key: string;
  }) => Observable<RegisterPixKeyRpcResponse>;
}
