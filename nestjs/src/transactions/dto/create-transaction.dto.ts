import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PixKeyKind } from '../../pix-keys/entities/pix-key.entity';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  pix_key_key: string;

  @IsIn(['cpf', 'email'])
  @IsString()
  @IsNotEmpty()
  pix_key_kind: PixKeyKind;

  @IsString()
  @IsOptional()
  description: string = null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsNotEmpty()
  amount: number;
}
