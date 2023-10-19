import { PartialType } from '@nestjs/mapped-types';
import { CreatePixKeyDto } from './create-pix-key.dto';

export class UpdatePixKeyDto extends PartialType(CreatePixKeyDto) {}
