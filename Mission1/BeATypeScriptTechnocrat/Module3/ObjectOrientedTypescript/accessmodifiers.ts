//* access modifiers

class BankAccount {
  readonly userId: number;
  userName: string;
  private userBalance: number;

  constructor(userId: number, userName: string, userBalance: number) {
    this.userId = userId;
    this.userName = userName;
    this.userBalance = userBalance;
  }

  addBalance(balance: number) {
    this.userBalance += balance;
  }
}

class StudentBankAccount extends BankAccount {
  test() {
    this.addBalance;
  }
}

const maxAccount = new BankAccount(123, "max", 90);

// maxAccount.userId = 345;
