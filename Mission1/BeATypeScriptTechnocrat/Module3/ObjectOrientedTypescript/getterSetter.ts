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

    set addBalance(amount: number) {
      this._userBalance = this._userBalance + amount;
    }

    get getBalance() {
      return this._userBalance;
    }

    // addBalance(balance: number) {
    //   this._userBalance += balance;
    // }
  }

  const maxAccount = new BankAccount(123, "max", 90);

  maxAccount.addBalance = 100;
  maxAccount.addBalance = 150;
  console.log(maxAccount);

  // maxAccount.userId = 345;
}
