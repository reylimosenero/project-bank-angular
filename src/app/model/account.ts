import { AccountTypeEnum } from "../enums/AccountTypeEnum";

export interface Account {
    id?: number;
    name: string;
    acctNumber?: string;
    type: String;
    balance?: number;
  }
  