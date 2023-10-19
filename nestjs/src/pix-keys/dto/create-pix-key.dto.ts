import { PixKeyKind } from '../entities/pix-key.entity';

export class CreatePixKeyDto {
  key: string;

  kind: PixKeyKind;
}
