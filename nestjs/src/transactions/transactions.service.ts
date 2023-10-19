import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { DataSource, Repository } from 'typeorm';
import {
  Transaction,
  TransactionOperation,
  TransactionStatus,
} from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from '../bank-accounts/entities/bank-account.entity';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTransactionFromAnotherBankAccountDto } from './dto/create-transaction-from-another-bank-account.dto';
import { PixKey } from '../pix-keys/entities/pix-key.entity';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
//import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  //Service Layer
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
    private dataSource: DataSource,
    @Inject('KAFKA_SERVICE')
    private kafkaService: ClientKafka,
  ) {}

  async create(
    bankAccountId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = await this.dataSource.transaction(async (manager) => {
      const bankAccount = await manager.findOneOrFail(BankAccount, {
        where: { id: bankAccountId },
        lock: { mode: 'pessimistic_write' },
      });

      const transaction = manager.create(Transaction, {
        ...createTransactionDto,
        amount: createTransactionDto.amount * -1,
        bank_account_id: bankAccountId,
        operation: TransactionOperation.debit,
      });

      await manager.save(transaction);

      bankAccount.balance += transaction.amount;
      await manager.save(bankAccount);
      return transaction;
    });

    const sendData = {
      id: transaction.id,
      accountId: bankAccountId,
      amount: createTransactionDto.amount,
      pixkeyto: createTransactionDto.pix_key_key,
      pixKeyKindTo: createTransactionDto.pix_key_kind,
      description: createTransactionDto.description,
    };

    await lastValueFrom(this.kafkaService.emit('transactions', sendData));

    return transaction;
  }

  findAll(bankAccountId: string) {
    return this.transactionRepo.find({
      where: { bank_account_id: bankAccountId },
      order: { created_at: 'DESC' },
    });
  }

  async createFromAnotherBankAccount(
    input: CreateTransactionFromAnotherBankAccountDto,
  ) {
    const transaction = await this.dataSource.transaction(async (manager) => {
      const pixKey = await manager.findOneOrFail(PixKey, {
        where: {
          key: input.pixKeyTo,
          kind: input.pixKeyKindTo,
        },
      });

      const bankAccount = await manager.findOneOrFail(BankAccount, {
        where: { id: pixKey.bank_account_id },
        lock: { mode: 'pessimistic_write' },
      });

      const transaction = await manager.create(Transaction, {
        related_transaction_id: input.id,
        amount: input.amount,
        description: input.description,
        bank_account_id: bankAccount.id,
        bank_account_from_id: input.accountId,
        pix_key_key: input.pixKeyTo,
        pix_key_kind: input.pixKeyKindTo,
        operation: TransactionOperation.credit,
        status: TransactionStatus.completed,
      });

      await manager.save(transaction);

      bankAccount.balance += transaction.amount;
      await manager.save(bankAccount);
    });

    const sendData = {
      ...input,
      status: 'confirmed',
    };

    await lastValueFrom(
      this.kafkaService.emit('transaction_confirmation', sendData),
    );

    return transaction;
  }

  async confirmTransaction(input: ConfirmTransactionDto) {
    const transaction = await this.transactionRepo.findOneOrFail({
      where: {
        id: input.id,
      },
    });

    await this.transactionRepo.update(
      { id: input.id },
      {
        status: TransactionStatus.completed,
      },
    );

    const sendData = {
      id: input.id,
      accountId: transaction.bank_account_id,
      amount: Math.abs(transaction.amount),
      pixkeyto: transaction.pix_key_key,
      pixKeyKindTo: transaction.pix_key_kind,
      description: transaction.description,
      status: TransactionStatus.completed,
    };

    await lastValueFrom(
      this.kafkaService.emit('transaction_confirmation', sendData),
    );

    return transaction;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
