//* access modifiers
{
  class BankAccount {
    readonly userId: number;
    userName: string;
    private _userBalance: number;

    constructor(userId: number, userName: string, _userBalance: number) {
      this.userId = userId;
      this.userName = userName;
      this._userBalance = _userBalance;
    }

    addBalance(balance: number) {
      this._userBalance += balance;
    }
  }

  class StudentBankAccount extends BankAccount {
    test() {
      this.addBalance;
    }
  }

  const maxAccount = new BankAccount(123, "max", 90);

  // maxAccount.userId = 345;
}
