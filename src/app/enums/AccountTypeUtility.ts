import { AccountTypeEnum } from "./AccountTypeEnum";

export class AccountTypeUtility {

    public static getListAccounts(): String[] {
        return [AccountTypeEnum.CHECKINGS, AccountTypeEnum.REGULAR, AccountTypeEnum.INTEREST];
    }
}