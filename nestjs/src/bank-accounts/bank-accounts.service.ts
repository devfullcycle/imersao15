import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { Repository } from 'typeorm';
import { BankAccount } from './entities/bank-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountRepo: Repository<BankAccount>,
  ) {}
  //DTO - Data Transfer Object
  create(createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepo.save(createBankAccountDto);
  }

  findAll() {
    return this.bankAccountRepo.find();
  }

  findOne(id: string) {
    return this.bankAccountRepo.findOneOrFail({
      where: { id },
    });
  }

  // update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
  //   return `This action updates a #${id} bankAccount`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} bankAccount`;
  // }
}
