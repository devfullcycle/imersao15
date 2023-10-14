import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  //Delete,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
//import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateBankAccountDto: UpdateBankAccountDto,
  // ) {
  //   return this.bankAccountsService.update(+id, updateBankAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bankAccountsService.remove(+id);
  // }
}
