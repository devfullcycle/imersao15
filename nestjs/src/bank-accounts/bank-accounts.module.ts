import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './entities/bank-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [BankAccountsController],
  providers: [BankAccountsService],
})
export class BankAccountsModule {}
