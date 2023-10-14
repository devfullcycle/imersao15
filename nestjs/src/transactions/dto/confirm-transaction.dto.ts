import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ConfirmTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: 'pending' | 'confirmed';
}
