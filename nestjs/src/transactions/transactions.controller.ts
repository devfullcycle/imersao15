import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransactionFromAnotherBankAccountDto } from './dto/create-transaction-from-another-bank-account.dto';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
//import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('bank-accounts/:bankAccountId/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Param('bankAccountId') bankAccountId: string,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(bankAccountId, createTransactionDto);
  }

  @Get()
  findAll(@Param('bankAccountId') bankAccountId: string) {
    return this.transactionsService.findAll(bankAccountId);
  }

  @MessagePattern('bank001')
  async onTransactionProcessedBank001(
    @Payload(new ValidationPipe())
    message: CreateTransactionFromAnotherBankAccountDto | ConfirmTransactionDto,
  ) {
    if (process.env.BANK_CODE !== '001') return;
    await this.processTransaction(message);
  }

  @MessagePattern('bank002')
  async onTransactionProcessedBank002(
    @Payload(new ValidationPipe())
    message: CreateTransactionFromAnotherBankAccountDto | ConfirmTransactionDto,
  ) {
    if (process.env.BANK_CODE !== '002') return;
    await this.processTransaction(message);
  }

  async processTransaction(
    message: CreateTransactionFromAnotherBankAccountDto | ConfirmTransactionDto,
  ) {
    try {
      if (message.status === 'pending') {
        await this.transactionsService.createFromAnotherBankAccount(
          message as CreateTransactionFromAnotherBankAccountDto,
        );
      }
      if (message.status === 'confirmed') {
        await this.transactionsService.confirmTransaction(
          message as ConfirmTransactionDto,
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
