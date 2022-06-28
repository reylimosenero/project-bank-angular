import { AccountTypeEnum } from "./AccountTypeEnum";

export class AccountTypeUtility {

    public static getListAccounts(): AccountTypeEnum[] {
        return [AccountTypeEnum.CHECKINGS, AccountTypeEnum.REGULAR, AccountTypeEnum.INTEREST];
    }
}