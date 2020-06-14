import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    console.time('usando map');
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.map(
      transaction => (balance[transaction.type] += transaction.value),
    );

    console.timeEnd('usando map');

    console.time('usando reduce');

    const balance2 = this.transactions.reduce(
      (accumulator, transaction) => {
        accumulator[transaction.type] += transaction.value;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    console.timeEnd('usando reduce');

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push({ ...transaction });

    return transaction;
  }
}

export default TransactionsRepository;
