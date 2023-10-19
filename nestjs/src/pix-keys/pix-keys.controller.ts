import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  //Delete,
} from '@nestjs/common';
import { PixKeysService } from './pix-keys.service';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';
//import { UpdatePixKeyDto } from './dto/update-pix-key.dto';

@Controller('bank-accounts/:bankAccountId/pix-keys')
export class PixKeysController {
  constructor(private readonly pixKeysService: PixKeysService) {}

  @Post()
  create(
    @Param('bankAccountId') bankAccountId: string,
    @Body() createPixKeyDto: CreatePixKeyDto,
  ) {
    return this.pixKeysService.create(bankAccountId, createPixKeyDto);
  }

  @Get()
  findAll(@Param('bankAccountId') bankAccountId: string) {
    return this.pixKeysService.findAll(bankAccountId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pixKeysService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePixKeyDto: UpdatePixKeyDto) {
  //   return this.pixKeysService.update(+id, updatePixKeyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pixKeysService.remove(+id);
  // }
}
