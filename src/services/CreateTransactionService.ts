import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error(`Transaction type ${type} is invalid.`);
    }

    if (type === 'outcome') {
      const currentBalance = this.transactionsRepository.getBalance();
      console.log('currentBalance:', currentBalance);
      if (currentBalance.total < value) {
        throw Error(
          'Transaction not authorized. Do not have total balance to process this operation.',
        );
      }
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
