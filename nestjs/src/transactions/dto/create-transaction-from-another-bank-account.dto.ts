import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { PixKeyKind } from '../../pix-keys/entities/pix-key.entity';

export class CreateTransactionFromAnotherBankAccountDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  pixKeyTo: string;

  @IsString()
  @IsNotEmpty()
  pixKeyKindTo: PixKeyKind;

  @IsOptional()
  description: string | null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  status: 'pending' | 'confirmed';
}
